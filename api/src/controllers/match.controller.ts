import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import dotenv from 'dotenv';
import { getAllDBActivities } from '../services/activities.services';
import ActivityInterface from "../interfaces/Activity.interface";

dotenv.config();

export const getMatchActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    const { word } = req.params;

    try {
        let activities = await getAllDBActivities();
        let filteredActivities: Array<Array<ActivityInterface>> = [];

        activities.forEach((byTier) => {
            filteredActivities.push(byTier.filter(ac => ac.name.toLowerCase().includes(word.toLowerCase())))
        });
        console.log(filteredActivities.length, filteredActivities[3].length);

        return filteredActivities[3].length ?
            res.status(200).json(<ServerResponse>({ status: 'success', data: filteredActivities }))
            : res.status(404).json(<ServerResponse>({ status: 'failed', message: 'Activities not found' }));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', message: 'Invalid request' || e }));
    }
};
