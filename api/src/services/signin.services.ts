import UserInterface from '../interfaces/User.interface';
import User from '../models/User.models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getUserService = async (email: string) => {
    try {
        const user = await User.findOne({email: email});
        return user;
    } catch (error) {
        throw error
    }
};

export const matchUserPasswordService = async (user: UserInterface, password: string) => {
    try {
        const match = await user.comparePassword(password);
        return match;
    } catch (error) {
        throw error
    }
};

export const createUserTokenService = (user: UserInterface) => {
    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string, {
        expiresIn: '3h'
    })
};