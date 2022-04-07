import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cart from "../interfaces/Cart.interface";
import Payment, { FrontFacingPayment } from "../interfaces/Payment.interface";
import { UserRoles } from '../interfaces/User.interface';
import User from '../models/User.models';

var cron = require('node-cron');
const nodemailer = require('nodemailer');

dotenv.config();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CREATOR,
        pass: process.env.PASS
    },
    tls: {
        rejectUnanthorized: false
    }
})

export const createPayPalOrder = async (cart: Cart, userID: string): Promise<any> => {
    let user = await User.findById(userID);
    if (user === null) throw new Error(`User ${userID} not found`);
    if (user.activeSubscription) throw new Error(`User ${userID} already has an active subscription`)
    const order = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: cart.price
                },
                description: cart.description
            }
        ],
        application_context: {
            brand_name: 'eztinerary',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: process.env.CLIENT_APP_PAYMENT_SUCCESS,
            cancel_url: process.env.CLIENT_APP_PAYMENT_CANCEL,
            shipping_preference: "NO_SHIPPING"
        }
    };

    try {
        const response: AxiosResponse = await axios.post(
            `${process.env.PAYPAL_URL}/v2/checkout/orders`,
            order,
            {
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID as string,
                    password: process.env.PAYPAL_CLIENT_SECRET as string,
                }
            }
        );

        await createPaymentInUserDB(userID, response, cart);
        return response.data.links.filter((link: any) => link.rel === "approve")[0];
    } catch (error) {
        throw error;
    }
}

export const capturePayPalOrder = async (token: string, userID: string): Promise<FrontFacingPayment> => {
    // https://developer.paypal.com/api/rest/reference/orders/v2/errors/
    try {
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            throw new Error(`Invalid user ID: ${userID}`);
        }

        const response = await axios.post(
            `${process.env.PAYPAL_URL}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID as string,
                    password: process.env.PAYPAL_CLIENT_SECRET as string
                }
            }
        );

        if (response.data.status === 'COMPLETED') {
            return updatePaymentInUserDB(userID, response.data.id)
        } else {
            throw new Error(`Payment (${response.data.id}) is not completed`);
        }
    } catch (error) {
        throw error;
    }
}

async function createPaymentInUserDB(userID: string, response: AxiosResponse<any, any>, cart: Cart) {
    let user = await User.findById(userID);
    if (user === null) {
        throw new Error(`User (${userID}) not found`);
    } else if (!user.payments.find((payment) => payment.id === response.data.id)) {
        user.payments.push({
            id: response.data.id as string,
            status: response.data.status as string,
            description: cart.description,
            tier: cart.tier,
            price: cart.price
        });

        user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
        await user.save();
    } else {
        throw new Error(`Payment (${response.data.id}) already exists`);
    }
}

async function updatePaymentInUserDB(userID: string, orderID: string): Promise<FrontFacingPayment> {
    let user = await User.findById(userID);

    if (user === null) {
        throw new Error(`User (${userID}) not found`);
    } else {
        let payment: Payment | undefined = user.payments.find((payment) => payment.id === orderID);
        if (!payment) {
            throw new Error(`Payment (${orderID}) not found`);
        }

        if (payment.status !== "COMPLETED") {
            payment.status = "COMPLETED";
            user.role = UserRoles.Business;
            user.activeSubscription = true;

            user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
            await user.save();

            let paymentCreationDate = payment.createdAt as Date;
            let subscriptionExpiry = new Date(paymentCreationDate.getTime());
            subscriptionExpiry.setMinutes(paymentCreationDate.getMinutes() + 2);

            let infoMailOptions = {
                from: `"New subscription" <${process.env.CREATOR}>`,
                to: user.email,
                subject: "User's subscription",
                html: `<h2> Hi, ${user.name}! Welcome to Eztinerary for Businesses! </h2>
                    <h4>You recently bought a subscription! Here are your order details:</h4>
                    <ul>
                    You subscribed to
                        <li>
                            ${payment.tier === 1
                        ? "Business Basic"
                        : payment.tier === 2
                            ? "Business Standard"
                            : "Business Premium"}
                        </li>
                        You subscribed on:
                        <li>${payment.createdAt}</li>
                            Your subscription ends on:
                        <li>${subscriptionExpiry}</li>
                    </ul>`
            };

            // sending email
            await transporter.sendMail(infoMailOptions, function (error: any, info: any) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("The user's subscription has ended")
                }
            });

            endSubscriptionUser(userID);

            return {
                name: user.name,
                email: user.email,
                tier: payment.tier,
                price: payment.price,
                description: payment.description,
                buyDate: payment.createdAt as Date,
                expireDate: subscriptionExpiry as Date
            }
        } else {
            throw new Error(`Payment ${orderID} is already completed`)
        }
    }
}

async function endSubscriptionUser(userID: string) {

    let user: any = await User.findById(userID);

    var date = new Date();
    // date.setMonth(date.getMonth() + 1);
    date.setMinutes(date.getMinutes() + 2);

    cron.schedule(`${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`, async () => {
        if (user === null) {
            throw new Error(`User (${userID}) not found`);
        } else {
            user.activeSubscription = false;
            await user.save()

            var mailOptions = {
                from: ` "Subscription" <${process.env.CREATOR}>`,
                to: user.email,
                subject: "Your Eztinerary subscription ended",
                html: `<h2> Hi there, ${user.name}! Your subscription has just ended </h2>
                    <h4>Please renew it to keep enjoying the benefits...</h4>
                    <p>Head over <a href=${process.env.DOMAINS}/plans>here</a> to stay with us </p>`
            };

            // sending email
            await transporter.sendMail(mailOptions, function (error: any, info: any) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("The user's subscription has ended")
                }
            });
        }
    });
}
