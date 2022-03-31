import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import User from '../models/User.models';
import Cart from "../interfaces/Cart.interface";

dotenv.config();

export const createPayPalOrder = async (cart: Cart, userID: string): Promise<any> => {
    console.log("start", cart);

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
            return_url: 'http://localhost:3001/payment/capture',
            cancel_url: 'http://localhost:3001/payment/cancel',
        }
    };
    console.log("created order");

    // const paypalAuthToken = createAuthToken();

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
        console.log("response.data:", response.data);
        return response.data;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }

}

export const capturePayPalOrder = async (token: string, PayerID: string, userID: string): Promise<any> => {
    // https://developer.paypal.com/api/rest/reference/orders/v2/errors/
    try {

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
            }
        }

    } catch (error) {
        console.error("capture error:");
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
        console.log("created payment");
    } else {
        console.log("found:",
            user.payments.find((payment) => payment.id === response.data.id));
        throw new Error(`Payment (${response.data.id}) already exists`);
    }
}
