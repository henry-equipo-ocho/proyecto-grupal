import { Request, Response } from 'express';
import User from '../models/User.models';
import dotenv from 'dotenv';
dotenv.config();

export const verifyEmail = async (req: Request, res: Response) => {

    try {
        const id = req.query.id;
        const user = await User.findById(id)

        if (user) {
            user.isVerified = true;
            await user.save();
            res.redirect(`${process.env.DOMAINS}/home`)  // crear ruta para signin en rl front
        } else {
            res.redirect(`${process.env.DOMAINS}/register`);
        }
    } catch (error) {
        throw error
    }
}