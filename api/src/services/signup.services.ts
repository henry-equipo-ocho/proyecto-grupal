import User from '../models/User.models';
import { Request } from 'express';

export const signUpService = async (req: Request): Promise<any> => {

    const user = await User.findOne({email: req.body.email});

    if(user) {
        // TODO: this should throw
        return 'User already exists';
    }
    try {
        const newUser = new User(req.body);
        await newUser.save();
        // TODO: is it necessary to return the new user?
        return newUser;
    } catch (error: any) {
        throw error;
    }
};