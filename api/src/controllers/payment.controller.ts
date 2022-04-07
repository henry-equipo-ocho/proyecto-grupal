import { Request, Response } from 'express';
import Cart from "../interfaces/Cart.interface";
import ServerResponse from '../interfaces/ServerResponse.interface';
import { capturePayPalOrder, createPayPalOrder } from '../services/payment.services';

declare module "express" {
    // https://stackoverflow.com/a/58201879
    interface Request {
        cart?: Cart;
    }
}

export const createOrder = async (req: Request, res: Response) => {
    if (!req.body.cart) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: 'Missing info' } }));
    }
    try {
        const order = await createPayPalOrder(req.body.cart, req.user.id);
        if (order) {

            return res.status(201).json(<ServerResponse>({ status: 'success', data: order }));
        }
        return res.status(500).json(<ServerResponse>({ status: 'failed', errors: { message: 'there was an error' } }));
    } catch (error) {
        return res.status(500).json(<ServerResponse>({ status: 'error', errors: { error } }));
    }
}

export const captureOrder = async (req: Request, res: Response) => {
    if (req.query.token === undefined) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: 'Missing info' } }));
    }

    try {
        const captured = await capturePayPalOrder(req.query.token as string, req.user._id);

        if (captured) {
            return res.status(200).json(<ServerResponse>({ status: 'success', data: captured }));
        }

        return res.status(500).json(<ServerResponse>({ status: 'failed', errors: { message: 'there was an error' } }));
    } catch (error: any) {
        return res.status(500).json(<ServerResponse>({ status: 'error', errors: { serverError: error.message } }));
    }
}