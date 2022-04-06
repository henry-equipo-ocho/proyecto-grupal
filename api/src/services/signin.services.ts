import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserInterface from '../interfaces/User.interface';
import User from '../models/User.models';

dotenv.config();

export const getUserService = async (email: string): Promise<any> => {
    try {
        const user = await User.findOne({ email: email });
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
    return jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET as string, {
        expiresIn: '15m'
    })
};

export const createRefreshTokenService = (user: UserInterface): string => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: '7d'
    })
};