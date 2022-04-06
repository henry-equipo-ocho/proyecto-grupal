import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import dotenv from 'dotenv';
import { getAllDBActivities } from '../services/activities.services';

dotenv.config();



export const getMatchActivitiesController: RequestHandler = async (req: Request, res: Response) => {

    const { word } = req.params;

    try {
        let activities = await getAllDBActivities();


        activities.forEach((byTier) => byTier.filter(ac => ac.name.toLowerCase().includes(word.toLowerCase())))


        return  activities.length ? res.status(200).json(<ServerResponse>({status: 'success', data: activities}))
        : res.status(404).json(<ServerResponse>({ status: 'failed', message: 'Activities not found' }));

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', message: 'Invalid request' || e}));
    }
};