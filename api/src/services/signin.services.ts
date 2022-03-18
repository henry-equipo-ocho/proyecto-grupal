import { Request } from 'express';
import UserInterface from '../interfaces/User.interface';
import User from '../models/User.models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createTokenService = (user: UserInterface) => {
    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    })
 }

export const signInServices = async (req: Request) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {return 'The user doesnt exists';}

        const match = await user.comparePassword(req.body.password);
        if(match) {return {token: createTokenService(user)};}

        return 'Password is incorrect';
    } catch (error) {
        throw error
    }
}