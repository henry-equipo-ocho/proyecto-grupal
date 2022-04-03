import { Request, Response } from "express";
import ServerResponse from "../interfaces/ServerResponse.interface";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const handleRefreshToken = async (req: Request, res: Response) => { 
    	
    try {
        const cookies = req.cookies;

        if(!cookies?.refreshToken) return res.status(400).send({status: 'failed', errors: {message: `Missing refresh token`}});

        const refreshToken = cookies.refreshToken;

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
            if(err) return res.status(400).send({status: 'failed', errors: {message: `Invalid refresh token`}});
            const token = jwt.sign({id: user.id, email: user.email, name: user.name, role: user.role}, process.env.JWT_SECRET as string, {
                expiresIn: '5s'
            });
            console.log('handleRefreshToken: token', token);
            return res.status(200).send({status: 'success', data: token});
        });
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const clearRefreshToken = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;

        if(!cookies?.refreshToken) return res.status(200).send({status: 'success'});

        res.clearCookie('refreshToken', { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(200).send({status: 'success'});
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const protectedRoute =async (req: Request, res: Response) => {
    try {
        res.send({status: 'success', data: {message: 'You are authenticated' + ' data: ' + req.body.data}}); 
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}


