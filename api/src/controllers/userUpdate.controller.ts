import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { updatePersonalInfo, updatePassword } from '../services/userUpdate.services';

export const getUserCurrentInfoController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        const {name, surname, email, country} = user;

        return res.status(200).send(<ServerResponse>({status: 'success', data: {name, surname, email, country}}))
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}))
    }
}

export const userUpdateController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;

        if(req.body.password) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'Invalid route to modified password'}}));

        if(Object.entries(req.body).length === 0) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'No values to modified'}}));

        if(Object.keys(req.body).includes('role')) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'No authorized to modified some props'}}));
        
        await updatePersonalInfo(req, user.id);
        
        return res.status(200).send(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const passwordUpdateController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        
        if(!req.body.password) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'Missing new password value'}}));

        await updatePassword(req.body.password, user.id);

        return res.status(200).send(<ServerResponse>({status: 'success'}))
        
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}))
    }
}