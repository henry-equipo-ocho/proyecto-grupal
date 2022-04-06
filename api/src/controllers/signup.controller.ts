import { Request, RequestHandler, Response } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { signUpService } from '../services/signup.services';


export const signUpController: RequestHandler = async (req: Request, res: Response) => {

    const { email, password, name, surname, country } = req.body;

    if (!email || !password || !name || !surname || !country) {
        return res.status(400).send(<ServerResponse>({ status: 'failed', errors: { message: `Missing values` } }));
    }

    try {
        const newUser = await signUpService(req);

        if (!newUser) return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: `Email already registered` } }));
        return res.status(200).json(<ServerResponse>{ status: 'success' });

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
}