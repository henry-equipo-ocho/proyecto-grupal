import { Request, Response, RequestHandler } from 'express';
import { createUserTokenService, getUserService, matchUserPasswordService, createRefreshTokenService } from '../services/signin.services';
import ServerResponse from '../interfaces/ServerResponse.interface';
import passport from 'passport';

export const signInController: RequestHandler = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send(<ServerResponse>({status: 'failed', errors: {message: `Missing values`}}));

    try {
      const user = await getUserService(email);
      if(!user) return res.status(400).json(<ServerResponse>({status: 'failed', errors: {message: `User doesn't exists`}}));

      const match = await matchUserPasswordService(user, password);
      if(!match) return res.status(400).json(<ServerResponse>({status: 'failed', errors: {message: `Invalid password`}}));

      const token = createUserTokenService(user);
      if(!token) return res.status(400).json(<ServerResponse>({status: 'failed', errors: {message: `Couldn't create token`}}));

      const refreshToken = createRefreshTokenService(user);
      if(!refreshToken) return res.status(400).json(<ServerResponse>({status: 'failed', errors: {message: `Couldn't create refresh token`}}));
      
      res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000});
      return res.status(200).json(<ServerResponse>{status: 'success', data: token});
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
};

export const signInSocialFailureController: RequestHandler = async (req: Request, res: Response) => {
    return res.status(400).redirect('http://localhost:3000/register/');
};

export const signInSocialCallBackController: RequestHandler = async (req: Request, res: Response) => {
    const email = req.user?._json?.email;

    try {
        const user = await getUserService(email);

        const token = createUserTokenService(user);

        if(!token) return res.status(400).json(<ServerResponse>({status: 'failed', errors: {message: `Couldn't create token`}}));

        return res.status(200).json(<ServerResponse>{status: 'success', data: token});  
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
};