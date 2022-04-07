import dotenv from 'dotenv';
import { Request } from "express";
import { Document, Types } from "mongoose";
import ActivityInterface from "../interfaces/Activity.interface";
import Activity from "../models/Activity.models";
const Amadeus = require('amadeus');

dotenv.config();

export const getAPIActivitiesService = async (req: Request): Promise<any> => {
    try {
        var amadeus = new Amadeus({
            clientId: process.env.AMADEUS_CLIENT_ID,
            clientSecret: process.env.AMADEUS_CLIENT_SECRET
        });

        const activities = await amadeus.shopping.activities.get({
            latitude: req.body.lat,
            longitude: req.body.lon,
            radius: 20
        }).then((response: any) => response.data).catch((error: any) => error.code);

        return activities;

    } catch (e) {
        throw e;
    }
};

export const saveActivitiesService = async (activity: ActivityInterface): Promise<any> => {
    try {

        const found = await Activity.findOne({ name: activity.name });
        if (found) throw new Error('Activity already exists');

        const newActivity = new Activity(activity);
        await newActivity.save();
    } catch (e) {
        throw e
    }
}

export const updateActivitiesService = async (activity: ActivityInterface): Promise<any> => {
    try {
        const found = await Activity.findOne({ name: activity.name });
        if (!found) throw new Error('Activity not found');

        const update = { price_currency: activity.price_currency, price_amount: activity.price_amount };
        await found.update(update);
        await found.save();
    } catch (e) {
        throw e
    }
}

export const getActivityById = async (id: string): Promise<any> => {
    try {
        const found = await Activity.findById(id);
        if (!found) throw new Error('Activity not found');
        return found;
    } catch (e) {
        throw e;
    }
}

export const getAllDBActivities = async () => {
    try {
        const rawActivities = await Activity.find().populate({
            path: 'ownerId',
            match: { activeSubscription: true },
            select: 'payments'
        });
        return [
            filterActivitiesByTier(rawActivities, 3, undefined),
            filterActivitiesByTier(rawActivities, 2, undefined),
            filterActivitiesByTier(rawActivities, 1, undefined),
            filterActivitiesByTier(rawActivities, undefined, true),
        ];
    } catch (e) {
        throw e;
    }
}

export const getDBCountryActivities = async (country: string) => {
    try {
        const rawActivities = await Activity.find({ country: country }).populate({
            path: 'ownerId',
            match: { activeSubscription: true },
            select: 'payments'
        });
        return [
            filterActivitiesByTier(rawActivities, 3, undefined),
            filterActivitiesByTier(rawActivities, 2, undefined),
            filterActivitiesByTier(rawActivities, 1, undefined),
            filterActivitiesByTier(rawActivities, undefined, true),
        ];
    } catch (e) {
        throw e;
    }
}

export const getDBCityActivities = async (country: string, city: string) => {
    try {
        const rawActivities = await Activity.find({ country: country, city: city }).populate({
            path: 'ownerId',
            match: { activeSubscription: true },
            select: 'payments'
        });
        return [
            filterActivitiesByTier(rawActivities, 3, undefined),
            filterActivitiesByTier(rawActivities, 2, undefined),
            filterActivitiesByTier(rawActivities, 1, undefined),
            filterActivitiesByTier(rawActivities, undefined, true),
        ];
    } catch (e) {
        throw e;
    }
}

export const getActivitiesFromArray = async (activitiesID: Array<string>): Promise<Array<ActivityInterface>> => {
    try {
        return await Activity.find({ '_id': { $in: activitiesID } });
    } catch (error) {
        throw error;
    }
}

export const updateActivityInfo = async (req: Request, id: string) => {
    try {
        const condictions = { _id: id }
        const update = req.body;

        Activity.findOneAndUpdate(condictions, update, (error: any, result: any) => {
            if (error) return error
            else return result;
        });
    } catch (e) {
        throw e
    }
}

function filterActivitiesByTier(rawActivities: Array<(Document<unknown, any, ActivityInterface> & ActivityInterface & { _id: Types.ObjectId; })>, tier: number | undefined, onlyThirdParty: boolean | undefined): ActivityInterface[] {
    if (onlyThirdParty) {
        return rawActivities.filter((activity) => !activity.ownerId);
    } else {
        return rawActivities.filter((activity) => {
            if (typeof activity.ownerId !== 'undefined' && typeof activity.ownerId !== 'string' && activity.ownerId?.payments) {
                return activity.ownerId && activity.ownerId.payments.at(-1)?.tier === tier;
            }
            return false;
        });
    }
}
export const updateFieldActivitiesService = async (): Promise<any> => {
    try {
        // await Activity.updateMany([{$addFields: {'watchedTimes': 0, 'bookedTimes': 0, 'created': false, 'ownerId': '624ca156deffe80d892baeb7'}}]);
        // await Activity.updateMany({}, {$unset: {ownerId: 1}});
    } catch (e) {
        throw e
    }
}

export const setWatchedTimesService = async (type: string, id: string) => {
    try {

        const found = await Activity.findOne({ _id: id });

        if (!found) throw new Error('Activity not found');

        if (type === 'watched') { found.watchedTimes = found.watchedTimes + 1; await found.save(); return found }
        if (type === 'booked') { found.bookedTimes = found.bookedTimes + 1; await found.save(); return found }

    } catch (e: any) {
        throw e;
    }
}

export const getUserActivities = async (id: string) => {
    try {
        const activities = await Activity.find({ ownerId: id });
        return activities;
    } catch (e) {
        throw e;
    }
}