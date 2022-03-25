import User from '../models/User.models';
import { Request } from 'express';

export const signUpService = async (req: Request): Promise<any> => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) throw new Error();

        const newUser = new User(req.body);
        await newUser.save();
        
        // TODO: is it necessary to return the new user?
        return newUser;
    } catch (error: any) {
        throw error;
    }
};