import dotenv from 'dotenv';
import { Request, RequestHandler, Response } from 'express';
import ActivityInterface from "../interfaces/Activity.interface";
import ServerResponse from '../interfaces/ServerResponse.interface';
import { getAllDBActivities } from '../services/activities.services';

dotenv.config();

export const getMatchActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    const { word } = req.params;

    try {
        let activities = await getAllDBActivities();
        let filteredActivities: Array<Array<ActivityInterface>> = [];

        activities.forEach((byTier) => {
            filteredActivities.push(byTier.filter(ac => ac.name.toLowerCase().includes(word.toLowerCase())))
        });

        return filteredActivities[3].length ?
            res.status(200).json(<ServerResponse>({ status: 'success', data: filteredActivities }))
            : res.status(404).json(<ServerResponse>({ status: 'failed', message: 'Activities not found' }));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', message: 'Invalid request' || e }));
    }
};
