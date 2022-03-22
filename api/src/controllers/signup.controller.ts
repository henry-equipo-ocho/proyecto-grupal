import { Request, Response, RequestHandler } from 'express';
import { signUpService } from '../services/signup.services';
import ServerResponse from '../interfaces/ServerResponse.interface';

export const signUpController: RequestHandler = async (req: Request, res: Response) => {

    const {email, password, name, surname, country} = req.body;

    if(!email || !password || !name || !surname || !country) {
        return res.status(400).send(<ServerResponse>{status: 'failed', message: `Missing values`});
    }

    try {
        const newUser = await signUpService(req);

        if(!newUser) return res.status(400).json(<ServerResponse>{status: 'failed', message: `Email already registered`})
        return res.status(200).json(<ServerResponse>{status: 'success', message: `User created succesfully`, data: newUser});

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>{status: 'error', message: e.message || e});
    }
}