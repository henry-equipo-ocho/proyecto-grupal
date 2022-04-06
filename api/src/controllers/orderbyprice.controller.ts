import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import dotenv from 'dotenv';
import { getDBCountryActivities, getDBCityActivities } from '../services/activities.services';

dotenv.config();



export const getOrderedPrice: RequestHandler = async (req: Request, res: Response) => {

    const { country, city, type } = req.body;
    const noactivities: ServerResponse = { status: 'success', message: 'Activities not found' }


    if (country) {

        if (type && city) {
            let activities = await getDBCityActivities(country, city);

            if (type === 'Ascendent') {
                activities.forEach((byTier) => byTier.sort(function (a: any, b: any) {
                    return a.price_amount - b.price_amount
                }));

                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))

            }
            else {
                activities.forEach((byTier) => byTier.sort(function (a: any, b: any) {
                    return b.price_amount - a.price_amount
                }));
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
            }
        };
        if (city) {
            const activities = await getDBCityActivities(country, city);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
        };
        if (type) {
            let activities = await getDBCountryActivities(country);

            if (type === 'Ascendent') {
                activities.forEach((byTier) => byTier.sort(function (a: any, b: any) {
                    return a.price_amount - b.price_amount
                }));

                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))

            }
            else {
                activities.forEach((byTier) => byTier.sort(function (a: any, b: any) {
                    return b.price_amount - a.price_amount
                }))
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
            }

        };
        let activities = await getDBCountryActivities(country);

        return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({ status: 'success', data: activities }))
    }


}