import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { signInServices } from '../services/signin.services';
import passport from 'passport';

dotenv.config();

export const signInController = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send('Missing values');
    }

    try {
      const token = await signInServices(req);
      return res.send(token);
    } catch (error: any) {
        return res.status(error.status || 400).json(error.message || error)
    }
}

export const signInGoogleController = passport.authenticate('google', { scope: ['profile'] });

export const signInGoogleFailureController = async (req: Request, res: Response) => {
    return res.status(401).send({success: false, message: 'Error'});
};

export const signInGoogleCallBackController = passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/google/failure'
})