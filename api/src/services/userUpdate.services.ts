import { Request } from 'express';
import User from '../models/User.models';

export const updatePersonalInfo = async (req: Request, id: string) => {
    try {
        const condictions = { _id: id }
        const update = req.body;

        User.findOneAndUpdate(condictions, update, (error: any, result: any) => {
            if (error) return error
            else return result;
        });
    } catch (e) {
        throw e
    }
}

export const updatePassword = async (password: string, id: string) => {
    try {
        User.findById(id, async function (err: any, result: any) {
            if (err) return false;
            result.password = password;
            await result.save();
        });
    } catch (e) {
        throw e
    }
}