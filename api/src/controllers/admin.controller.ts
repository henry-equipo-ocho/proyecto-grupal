import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { signUpService } from '../services/signup.services';
import { deleteUserService, getAllUserService, deleteActivityService } from '../services/admin.services';
import { getAllDBActivities, updateActivityInfo, saveActivitiesService } from '../services/activities.services';
import { updatePassword, updatePersonalInfo } from '../services/userUpdate.services';

export const roleVerify = (req: Request, res: Response, next: Function) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }

    if (req.user.role !== 3) {
        return res.status(403).send('Forbidden');
    }

    next();
}

export const tokenVerifyController = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const match = jwt.verify(token, process.env.JWT_SECRET as string);
        return res.status(200).send(<ServerResponse>({status: 'success', data: true}));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const createUserController = async (req: Request, res: Response) => {
    const {email, password, name, surname, country, role} = req.body;

    if(!email || !password || !name || !surname || !country ||  role === undefined) {
        return res.status(400).send(<ServerResponse>({status: 'failed', errors: {message: `Missing values`}}));
    }

    try {
        const newUser = await signUpService(req);

        if(!newUser) return res.status(400).json(<ServerResponse>({status: 'failed', errors: {message: `Email already registered`}}));
        return res.status(200).json(<ServerResponse>{status: 'success'});

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        await deleteUserService(id);

        return res.status(200).json(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUserService();

        return res.status(200).json(<ServerResponse>({status: 'success', data: users}));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}


export const deleteActivityController = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        await deleteActivityService(id);

        return res.status(200).json(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const getAllActivitiesController = async (req: Request, res: Response) => {
    try {
        const activities = await getAllDBActivities();

        return res.status(200).json(<ServerResponse>({status: 'success', data: activities}));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const userUpdateController = async (req: Request, res: Response) => {
    try {

        const { id } = req.body;

        if(req.body.password) await updatePassword(req.body.password, id);

        if(Object.entries(req.body).length === 1 && req.body.password) return res.status(200).send(<ServerResponse>({status: 'success'}));

        if(Object.entries(req.body).length === 0 ) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'No values to modified'}}));

        req.body.password && delete req.body.password;
        
        await updatePersonalInfo(req, id);
        
        return res.status(200).send(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const activityUpdateController = async (req: Request, res: Response) => {
    try {

        const { id } = req.body;
        
        await updateActivityInfo(req, id);
        
        return res.status(200).send(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const createActivityController = async (req: Request, res: Response) => {
    const {name, description, picture, city, country, price_currency, price_amount, booking} = req.body;

    if(!name || !description || !picture || !country || !city || !price_currency || !price_amount || !booking) {
        return res.status(400).send(<ServerResponse>({status: 'failed', errors: {message: `Missing values`}}));
    }

    const activitiesFormat = {name, description, picture, city, country, price_currency, price_amount, booking, watchedTimes: 0, bookedTimes: 0};

    try {
        
        await saveActivitiesService(activitiesFormat);
        return res.status(200).json(<ServerResponse>{status: 'success'});

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}