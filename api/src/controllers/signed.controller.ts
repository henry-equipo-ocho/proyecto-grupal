import { Request, Response } from 'express';

export const signedController = async (req: Request, res: Response) => {
    res.send('Authenticated');
}