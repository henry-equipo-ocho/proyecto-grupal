import { Request, Response, RequestHandler } from 'express';

export const signedController: RequestHandler = async (req: Request, res: Response) => {
    res.send('Authenticated');
}