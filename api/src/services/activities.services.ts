import Activity from "../models/Activity.models";
import ActivityInterface from "../interfaces/Activity.interface";
import { Request } from "express";
const Amadeus = require('amadeus');
import dotenv from 'dotenv';

dotenv.config();

export const getAPIActivitiesService = async (req: Request): Promise<any> => {
    try {
        var amadeus = new Amadeus({
            clientId: process.env.AMADEUS_CLIENT_ID,
            clientSecret: process.env.AMADEUS_CLIENT_SECRET 
        });
    
        const activities = await amadeus.shopping.activities.get({
            latitude: req.body.lat,
            longitude: req.body.lon
        }).then((response: any) => response.data).catch((error: any) => error.code);

        return activities;
    
    } catch (e) {
        throw e;
    }
};

export const saveActivitiesService = async (activity: ActivityInterface): Promise<any> => {
    try {
        const newActivity = new Activity(activity);
        await newActivity.save();
    } catch (e) {
        throw e
    }
}

export const getAllDBActivities = async () => {
    try {
        const activities = await Activity.find();
        return activities;
    } catch (e) {
        throw e;
    }
}

export const getDBCountryActivities = async (country: string) => {
    try {
        const activities = await Activity.find({country: country});
        return activities;
    } catch (e) {
        throw e;
    }
}

export const getDBCityActivities = async (country: string, city: string) => {
    try {
        const activities = await Activity.find({country: country, city: city});
        return activities;
    } catch (e) {
        throw e;
    }
}