import User from '../models/User.models';
import { Request } from 'express';

export const signUpService = async (req: Request) => {

    const user = await User.findOne({email: req.body.email});

    if(user) {
        return 'User already exists';
    }
    try {
        const newUser = new User(req.body);
        await newUser.save();
        return newUser;
    } catch (error: any) {
        throw error;
    }
};