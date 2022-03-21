import { Request, Response } from 'express';
import { createUserTokenService, getUserService, matchUserPasswordService } from '../services/signin.services';
import passport from 'passport';

export const signInController = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({status: 400, message: `Missing values`});

    try {
      const user = await getUserService(email);
      if(!user) return res.status(400).json({status: 400, message: `User doesn't exists`});

      const match = await matchUserPasswordService(user, password);
      if(!match) return res.status(400).json({status: 400, message: `Invalid password`});

      const token = createUserTokenService(user);
      if(!token) return res.status(400).json({status: 400, message: `Couldn't create token`})

      return res.status(200).json({status: 200, message: `Succesfull login`, data: token});
    } catch (e: any) {
        return res.status(e.status || 400).json({status: e.status || 400, message: e.message || e})
    }
};

// Google sign in controller on testing

export const signInGoogleController = passport.authenticate('google', { scope: ['profile'] });

export const signInGoogleFailureController = async (req: Request, res: Response) => {
    return res.status(401).send({success: false, message: 'Error'});
};

export const signInGoogleCallBackController = passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/google/failure'
})
