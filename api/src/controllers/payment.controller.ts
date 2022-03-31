import { Request, Response, RequestHandler } from 'express';
import Cart from "../interfaces/Cart.interface";
import ServerResponse from '../interfaces/ServerResponse.interface';
import { createPayPalOrder, capturePayPalOrder } from '../services/payment.services';

declare module "express" {
    // https://stackoverflow.com/a/58201879
    interface Request {
        cart?: Cart;
    }
}

export const createOrder = async (req: Request, res: Response) => {
    if (!req.body.cart) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: 'Missing cart' } }));
    }
    try {
        const order = await createPayPalOrder(req.body.cart, req.user.id);
        if (order) {
            return res.status(201).json(<ServerResponse>({ status: 'success', data: order }));
        }
        return res.status(500).json(<ServerResponse>({ status: 'failed', errors: { message: 'there was an error' } }));
    } catch (error) {
        console.log("catch en el controller");
        return res.status(500).json(<ServerResponse>({ status: 'error', errors: { error } }));
    }
}

export const captureOrder = async (req: Request, res: Response) => {
    if (req.query.token === undefined || req.query.PayerID === undefined) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: 'Missing payment info' } }));
    }

    try {
        // TODO: see how to pass the payer-associated User ID (redirect al front after success?)

        const captured = capturePayPalOrder(req.query.token as string, req.query.PayerID as string, "erroringID"); // ! erroring ID

        if (captured) {
            return res.status(200).json(<ServerResponse>({ status: 'success', data: captured }));
        }

        // TODO: redirect al front
        // return res.redirect("http://localhost:3000/rutadecamilo");
        return res.status(500).json(<ServerResponse>({ status: 'failed', errors: { message: 'there was an error' } }));
    } catch (error) {
        return res.status(500).json(<ServerResponse>({ status: 'failed', errors: { error } }));
    }
}