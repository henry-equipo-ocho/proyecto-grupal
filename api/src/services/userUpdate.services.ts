import User from '../models/User.models';
import { Request } from 'express';

export const updatePersonalInfo = async (req: Request, id: string) => {
    try {
        const condictions = {_id: id}
        const update = req.body;

        User.findOneAndUpdate(condictions, update, (error: any, result: any) => {
            if(error) return error
            else return result;
        });
    } catch (e) {
        throw e
    }
}

export const updatePassword = async (req: Request, id: string) => {
   try {
        User.findById(id, async function(err: any, doc: any) {
            if (err) return false;
            doc.password = req.body.password;
            await doc.save();
        });
    } catch (e) {
        throw e
    }
}