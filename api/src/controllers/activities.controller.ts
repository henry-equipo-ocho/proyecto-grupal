import dotenv from 'dotenv';
import { Request, RequestHandler, Response } from 'express';
import ActivityInterface from '../interfaces/Activity.interface';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { getAllDBActivities, getAPIActivitiesService, getDBCityActivities, getDBCountryActivities, saveActivitiesService, setWatchedTimesService } from '../services/activities.services';
const Amadeus = require('amadeus');

dotenv.config();

// Actividades de Buenos Aires
export const apiActivitiesController: RequestHandler = async (req: Request, res: Response) => {

    try {
        const activities = await getAPIActivitiesService(req);

        for (let i: number = 0; i < activities.length; i++) {
            const activitiesFormat: ActivityInterface = {
                name: activities[i].name,
                description: activities[i].shortDescription,
                picture: activities[i].pictures ? activities[i].pictures[0] : null,
                city: req.body.city,
                country: req.body.country,
                price_currency: activities[i]?.price?.currencyCode,
                price_amount: activities[i]?.price?.amount,
                booking: activities[i]?.bookingLink,
                watchedTimes: 0,
                bookedTimes: 0
            }

            const { name, description, picture, city, country, price_currency, price_amount, booking } = activitiesFormat;

            if (!name || !description || !picture || !city || !country || !price_currency || !price_amount || !booking) { continue };

            await saveActivitiesService(activitiesFormat);
        }

        res.status(200).send(<ServerResponse>({ status: 'success' }));

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
};

export const updateAPIActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const activities = await getAPIActivitiesService(req);

        for (let i: number = 0; i < activities.length; i++) {
            const activitiesFormat: ActivityInterface = {
                name: activities[i].name,
                description: activities[i].shortDescription,
                picture: activities[i].pictures ? activities[i].pictures[0] : null,
                city: req.body.city,
                country: req.body.country,
                price_currency: activities[i]?.price?.currencyCode,
                price_amount: activities[i]?.price?.amount,
                booking: activities[i]?.bookingLink,
                watchedTimes: 0,
                bookedTimes: 0
            }

            const { name, description, picture, city, country, price_currency, price_amount, booking } = activitiesFormat;

            if (!name || !description || !picture || !city || !country || !price_currency || !price_amount || !booking) { continue };

            await saveActivitiesService(activitiesFormat);
        }
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
}

export const getActivitiesController: RequestHandler = async (req: Request, res: Response) => {

    const { country, city } = req.body;
    const noactivities: ServerResponse = { status: 'success', message: 'Activities not found' }

    try {
        if (city) {
            const activities = await getDBCityActivities(country, city);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
        }
        if (country) {
            const activities = await getDBCountryActivities(country);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
        }

        const activities = await getAllDBActivities();
        return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
};

export const setWatchedorBookedTimesController = async (req: Request, res: Response) => {
    try {
        const { type, id } = req.body;
        await setWatchedTimesService(type, id);
        return res.sendStatus(200);
    } catch (e: any) {
        res.sendStatus(400);
    }
}