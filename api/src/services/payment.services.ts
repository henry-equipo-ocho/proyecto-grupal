import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import mongoose from 'mongoose';
import User from '../models/User.models';
import { UserRoles } from '../interfaces/User.interface';
import Cart from "../interfaces/Cart.interface";

dotenv.config();

export const createPayPalOrder = async (cart: Cart, userID: string): Promise<any> => {
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
        },
        custom_user_id: userID
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
        return response.data.links.filter((link:any) => link.rel === "approve");
    } catch (error) {
        throw error;
    }
}

export const capturePayPalOrder = async (token: string, userID: string): Promise<any> => {
    // https://developer.paypal.com/api/rest/reference/orders/v2/errors/
    try {
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            console.log(mongoose.Types.ObjectId.isValid(userID));

            throw new Error(`Invalid user ID: ${userID}`);
        }

        console.log("boutta ask paypal");
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

        console.log("response.data:", response.data);
        if (response.data.status === 'COMPLETED') {
            let user = await User.findById(userID);

            if (user === null) {
                throw new Error(`User (${userID}) not found`);
            } else {
                let payment = user.payments.find((payment) => payment.id === response.data.id);
                if (!payment) {
                    throw new Error(`Payment (${response.data.id}) not found`);
                }

                payment.status = "COMPLETED";
                user.role = UserRoles.Business;
                user.activeSubscription = true;

                user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
                await user.save();
                return true
            }
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
        });

        user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
        await user.save();
    } else {
        throw new Error(`Payment (${response.data.id}) already exists`);
    }
}
