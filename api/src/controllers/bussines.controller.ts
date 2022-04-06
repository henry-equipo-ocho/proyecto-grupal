import { RequestHandler, Response, Request } from "express";
import { getActivityById, getUserActivities, saveActivitiesService, updateActivityInfo } from "../services/activities.services";
import ActivityInterface from "../interfaces/Activity.interface";
import ServerResponse from "../interfaces/ServerResponse.interface";
import { deleteActivityService } from "../services/admin.services";

export const roleVerify = (req: Request, res: Response, next: Function) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }

    if (req.user.role !== 1) {
        return res.status(403).send('Forbidden');
    }

    next();
}

export const getBusinesActivities: RequestHandler = async (req: Request, res: Response) => {
    const id = req.user?.id;

    const activities = await getUserActivities(id);

    !activities ? res.status(400).send({ status: "failed", errors: { message: "Activities not found" } }) : res.status(200).send({ status: "success", data: activities });
}

export const postBusinesActivities: RequestHandler = async (req: Request, res: Response) => {

    try {
        const id = req.user?.id;
        const tier = req.user?.payments?.pop().tier;

        const {name, description, picture, city, country, price_currency, price_amount, booking} = req.body;

        if(!name || !description || !picture || !country || !city || !price_currency || !price_amount || !booking) {res.status(400).send({ status: "failed", errors: { message: "Missing values" } })}

        const activitiesFormat: ActivityInterface = {name, description, picture, city, country, price_currency, price_amount, booking, watchedTimes: 0, bookedTimes: 0, ownerId: id};

        if (tier === 3) {await saveActivitiesService(activitiesFormat); return res.status(200).send({ status: "success" }); }

        const activities = await getUserActivities(id);

        if (tier === 1 && activities.length < 3) {await saveActivitiesService(activitiesFormat); return res.status(200).send({ status: "success" }); }
        if (tier === 2 && activities.length < 5) {await saveActivitiesService(activitiesFormat); return res.status(200).send({ status: "success" });}

        return res.status(400).send({ status: "failed", errors: { message: "You have reached the limit of activities" } });
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const updateBusinessActivities: RequestHandler = async (req: Request, res: Response) => {
    try {

        const { id } = req.body;

        const activity = await getActivityById(id);

        if(activity.ownerId !== req.user?.id) {return res.status(400).send({ status: "failed", errors: { message: "You are not the owner of this activity" } })};
        
        await updateActivityInfo(req, id);
        
        return res.status(200).send(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}

export const deleteBusinessActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const activity = await getActivityById(id);

        if(activity.ownerId !== req.user?.id) {return res.status(400).send({ status: "failed", errors: { message: "You are not the owner of this activity" } })};

        await deleteActivityService(id);

        return res.status(200).json(<ServerResponse>({status: 'success'}));
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', errors: {message: e.message || e}}));
    }
}