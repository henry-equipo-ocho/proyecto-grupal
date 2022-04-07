import { Request, RequestHandler, Response } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { createRefreshTokenService, createUserTokenService, getUserService, matchUserPasswordService, sendResetPasswordEmailService } from '../services/signin.services';
import dotenv from 'dotenv';
dotenv.config();

export const signInController: RequestHandler = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send(<ServerResponse>({ status: 'failed', errors: { message: `Missing info` } }));

    try {
        const user = await getUserService(email);
        if (!user) return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: `User doesn't exist` } }));

        const match = await matchUserPasswordService(user, password);
        if (!match) return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: `Invalid password` } }));

        const token = createUserTokenService(user);
        if (!token) return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: `Couldn't create token` } }));

        const refreshToken = createRefreshTokenService(user);
        if (!refreshToken) return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: `Couldn't create refresh token` } }));

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json(<ServerResponse>{ status: 'success', data: token });
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
};

export const signInSocialFailureController: RequestHandler = async (req: Request, res: Response) => {
    return res.status(400).redirect(`${process.env.DOMAINS}/register/`);
};

export const signInSocialCallBackController: RequestHandler = async (req: Request, res: Response) => {
    
    const email = req.user?._json?.email;

    try {
        const user = await getUserService(email);

        const refreshToken = createRefreshTokenService(user);
        
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.redirect(`${process.env.DOMAINS}/social-login/`);

        // return res.status(200).json(<ServerResponse>{ status: 'success', data: token });
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
};

export const forgotPasswordController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user = await getUserService(req.body.email);
        if (!user) return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: `User doesn't exist` } }));

        const token = createUserTokenService(user);

        await sendResetPasswordEmailService(req.body.email, token);

        return res.status(200).json(<ServerResponse>{ status: 'success', data: { message: `Email sent` } });
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
}