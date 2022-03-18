import { Request, Response } from 'express';
import { signUpService } from '../services/signup.services';

export const signUpController = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.surname || !req.body.country) {
        return res.status(400).send('Missing values');
    }

    try {
        const newUser = await signUpService(req);
        return res.status(200).send(newUser); // TODO: user created
    } catch (error: any) {
        return res.status(error.status || 400).json(error.message || error)
    }
}