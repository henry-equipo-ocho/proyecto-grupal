import { Request } from 'express';
import UserInterface from '../interfaces/User.interface';
import User from '../models/User.models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createTokenService = (user: UserInterface): string => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    })
}

export const signInServices = async (req: Request): Promise<object> => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) { throw new Error("The user doesn't exist"); }

        const match: boolean = await user.comparePassword(req.body.password);
        if (match) { return { token: createTokenService(user) }; }

        throw new Error("Password is incorrect")
    } catch (error) {
        throw error
    }
}