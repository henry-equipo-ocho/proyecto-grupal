import { Request, RequestHandler, Response } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { getActivitiesFromArray } from '../services/activities.services';
import { addUserFavorite, deleteUserFavorite, getUserFavorites } from '../services/userFavorites.services';

declare module "express" {
    // https://stackoverflow.com/a/58201879
    interface Request {
        user?: any;
    }
}

export const getUserActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: "Missing user auth" } }));
    }

    try {
        const userActivitiesID = await getUserFavorites(req.user?._id || undefined);
        let activities = [];
        for (let i = 0; i < userActivitiesID.length; i++) {
            activities.push({ name: userActivitiesID[i].name, activities: await getActivitiesFromArray(userActivitiesID[i].activities) });
        }

        return res.status(200).json(<ServerResponse>({ status: 'success', data: activities }));
    } catch (error: any) {
        return res.status(400).json(<ServerResponse>({ status: 'error', errors: { message: error.message } }));
    }
}

export const addUserActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.user || (req.body.activityID === undefined && req.body.itineraryName === undefined)) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: "Missing user auth" } }));
    }

    try {
        const added = await addUserFavorite(req.user._id, req.body.activityID, req.body.itineraryName);
        if (added) {
            return res.status(200).json(<ServerResponse>({ status: 'success', data: `Added activity (${req.body.activityID}) to favorites` }));
        } else {
            return res.status(409).json(<ServerResponse>({ status: 'failed', data: `Activity (${req.body.activityID}) already exists in itinerary (${req.body.itineraryName}})` }));
        }
    } catch (error: any) {
        return res.status(400).json(<ServerResponse>({ status: 'error', errors: { message: error.errors } }));
    }
}

export const deleteUserActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.user || (req.body.activityID === undefined && req.body.itineraryName === undefined)) {
        return res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: "Missing info" } }));
    }

    try {
        const deleted = await deleteUserFavorite(req.user._id, req.body.itineraryName, req.body.activityID);

        if (deleted) {
            return res.status(200).json(<ServerResponse>({ status: 'success', data: `Deleted activity (${req.body.activityID}) from itinerary (${req.body.itineraryName})` }));
        }
        return res.status(409).json(<ServerResponse>({ status: 'failed', message: `Itinerary (${req.body.itineraryName}) or activity (${req.body.activityID}) not found` }));
    } catch (error: any) {
        return res.status(400).json(<ServerResponse>({ status: 'error', errors: { message: error.errors } }));
    }
}