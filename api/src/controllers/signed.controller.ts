import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';

export const signedController: RequestHandler = async (req: Request, res: Response) => {
    res.send(<ServerResponse>{status: 'success', message: 'Authenticated'});
}