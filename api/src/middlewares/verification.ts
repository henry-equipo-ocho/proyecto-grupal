import { Request, Response } from 'express';
import User from '../models/User.models';


const verifyEmail = async (req: Request, res: Response, next: any) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user?.isVerified) {
            next()
        }
        else {
            // TODO: que deberia suceder aca?
            res.status(401).json({status: 'failed', errors: {message: 'Email not verified'}})
        }
    } catch (error) {
        throw error
    }

};


export default verifyEmail