import dotenv from 'dotenv';
import { Request, RequestHandler, Response } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { getAllDBActivities, getDBCountryActivities } from '../services/activities.services';

dotenv.config();



export const getOrderedCities: RequestHandler = async (req: Request, res: Response) => {

    const { country, type } = req.body;
    const noactivities: ServerResponse = { status: 'success', message: 'Activities not found' }

    if (type === 'A-Z') {
        try {

            if (country) {
                const activities = await getDBCountryActivities(country)

                let orderedActivities = activities.sort(function (a: any, b: any) {
                    if (a.city > b.city) { return 1 }

                    else if (b.city > a.city) { return -1 }

                    return 0;
                })

                return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: orderedActivities }))

            }
            else {
                let activities = await getAllDBActivities();

                activities.forEach((byTier) => byTier.sort(function (a: any, b: any) {
                    if (a.city > b.city) { return 1 }

                    else if (b.city > a.city) { return -1 }

                    return 0;
                }))
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
            }

        } catch (error: any) {

            return res.status(error.status || 400).json(<ServerResponse>({ status: 'error', message: 'Invalid Request' || error }));
        }
    }

    if (type === 'Z-A') {
        try {

            if (country) {
                const activities = await getDBCountryActivities(country)

                var orderedActivities = activities.sort(function (a: any, b: any) {
                    if (a.city > b.city) { return -1 }

                    else if (b.city > a.city) { return 1 }

                    return 0;
                })

                return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: orderedActivities }))

            }
            else {
                let activities = await getAllDBActivities();

                activities.forEach((byTier) => byTier.sort(function (a: any, b: any) {
                    if (a.city > b.city) { return 1 }

                    else if (b.city > a.city) { return -1 }

                    return 0;
                }))
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
            }

        } catch (error: any) {

            return res.status(error.status || 400).json(<ServerResponse>({ status: 'error', message: 'Invalid Request' || error }));
        }
    }



};