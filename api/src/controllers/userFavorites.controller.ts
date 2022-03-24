import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { getUserFavorites, addUserFavorite, deleteUserFavorite } from '../services/userFavorites.services';
import { getActivitiesFromArray } from '../services/activities.services';

export const getUserActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.body.userID) {
        res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: "Missing user ID" } }));
    }

    try {
        const userActivitiesID = await getUserFavorites(req.body.userID);
        let activities = [];
        for (let i = 0; i < userActivitiesID.length; i++) {
            activities.push(await getActivitiesFromArray(userActivitiesID[i]));
        }

        res.status(200).json(<ServerResponse>({ status: 'success', data: activities }));
    } catch (error: any) {
        res.status(400).json(<ServerResponse>({ status: 'error', errors: { message: error.message } }));
    }
}

export const addUserActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.body.userID || !req.body.activityID) {
        res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: "Missing info" } }));
    }

    try {
        await addUserFavorite(req.body.userID, req.body.activityID, req.body.itineraryIndex);

        res.status(200).json(<ServerResponse>({ status: 'success', data: `Added activity (${req.body.activityID}) to favorites` }));
    } catch (error: any) {
        res.status(400).json(<ServerResponse>({ status: 'error', errors: { message: error.errors } }));
    }
}

export const deleteUserActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.body.userID || !req.body.activityID) {
        res.status(400).json(<ServerResponse>({ status: 'failed', errors: { message: "Missing info" } }));
    }

    try {
        await deleteUserFavorite(req.body.userID, req.body.activityID);

        res.status(200).json(<ServerResponse>({ status: 'success', data: `Deleted activity (${req.body.activityID}) from favorites` }));
    } catch (error: any) {
        res.status(400).json(<ServerResponse>({ status: 'error', errors: { message: error.errors } }));
    }
}