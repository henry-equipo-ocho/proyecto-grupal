import { Request, Response, RequestHandler } from 'express';
import { createUserTokenService, getUserService, matchUserPasswordService } from '../services/signin.services';
import ServerResponse from '../interfaces/ServerResponse.interface';
import passport from 'passport';

export const signInController: RequestHandler = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send(<ServerResponse>{status: 'failed', message: `Missing values`});

    try {
      const user = await getUserService(email);
      if(!user) return res.status(400).json(<ServerResponse>{status: 'failed', message: `User doesn't exists`});

      const match = await matchUserPasswordService(user, password);
      if(!match) return res.status(400).json(<ServerResponse>{status: 'failed', message: `Invalid password`});

      const token = createUserTokenService(user);
      if(!token) return res.status(400).json(<ServerResponse>{status: 'failed', message: `Couldn't create token`})

      return res.status(200).json(<ServerResponse>{status: 'success', message: `Succesfull login`, data: token});
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>{status: e.status || 'failed', message: e.message || e})
    }
};

// Google sign in controller on testing

export const signInGoogleController: RequestHandler = passport.authenticate('google', { scope: ['profile'] });

export const signInGoogleFailureController: RequestHandler = async (req: Request, res: Response) => {
    return res.status(401).send({ success: false, message: 'Error' });
};

export const signInGoogleCallBackController: RequestHandler = passport.authenticate('google', {
    // TODO: set up this URLs
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/google/failure'
})
