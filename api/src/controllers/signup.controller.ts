import { Request, Response, RequestHandler } from 'express';
import { signUpService } from '../services/signup.services';

export const signUpController: RequestHandler = async (req: Request, res: Response) => {

    const {email, password, name, surname, country} = req.body;

    if(!email || !password || !name || !surname || !country) {
        return res.status(400).send({status: 400, message: `Missing values`});
    }

    try {
        const newUser = await signUpService(req);

        if(!newUser) return res.status(400).json({status: 400, message: `Email already registered`})
        return res.status(200).json({status: 200, message: `User created succesfully`, data: newUser});

    } catch (error: any) {
        return res.status(error.status || 400).json(error.message || error)
    }
}