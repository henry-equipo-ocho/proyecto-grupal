import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { signInServices } from '../services/signip.services';

dotenv.config();

export const signInController = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send('Missing values');
    }

    try {
      const token = await signInServices(req);
      return res.send(token);
    } catch (error: any) {
        return res.status(error.status || 400).json(error.message || error)
    }
}