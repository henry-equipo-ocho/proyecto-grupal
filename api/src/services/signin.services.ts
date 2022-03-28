import UserInterface from '../interfaces/User.interface';
import User from '../models/User.models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getUserService = async (email: string): Promise<any> => {
    try {
        const user = await User.findOne({email: email});
        return user;
    } catch (error) {
        throw error
    }
};

export const matchUserPasswordService = async (user: UserInterface, password: string): Promise<boolean> => {
    try {
        const match: boolean = await user.comparePassword(password);
        return match;
    } catch (error) {
        throw error
    }
};

export const createUserTokenService = (user: UserInterface): string => {
    return jwt.sign({id: user.id, email: user.email, name: user.name}, process.env.JWT_SECRET as string)
};