import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
const Amadeus = require('amadeus');
import dotenv from 'dotenv';
import ActivityInterface from '../interfaces/Activity.interface';
import { getAPIActivitiesService, saveActivitiesService, getAllDBActivities, getDBCountryActivities, getDBCityActivities } from '../services/activities.services'

dotenv.config();

// Actividades de Buenos Aires
export const apiActivitiesController: RequestHandler = async (req: Request, res: Response) => {

    try {
        const activities = await getAPIActivitiesService(req);

        for(let i: number = 0; i < activities.length; i++){
            const activitiesFormat: ActivityInterface = {
                name: activities[i].name,
                description: activities[i].shortDescription,
                picture: activities[i].pictures ? activities[i].pictures[0] : null,
                city: req.body.city,
                country: req.body.country,
                price_currency: activities[i]?.price?.currencyCode,
                price_amount: activities[i]?.price?.amount,
                booking: activities[i]?.bookingLink
            }

            const {name, description, picture, city, country, price_currency, price_amount, booking} = activitiesFormat;

            if(!name || !description || !picture || !city || !country || !price_currency || !price_amount || !booking) {continue};

            await saveActivitiesService(activitiesFormat);
        }

        res.status(200).send(<ServerResponse>({status: 'success', message: 'Activities sucesfully saved'}));

    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', message: e.message || e}));
    }
};

export const getActivitiesController: RequestHandler = async (req: Request, res: Response) => {
    
    const {country, city} = req.body;
    const noactivities: ServerResponse = {status: 'success', message: 'Activities not found'} 

    try {
        if(city) {
            const activities = await getDBCityActivities(country, city);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', message: 'Activities sucesfully loaded', data: activities}))
        }
        if(country) {
            const activities = await getDBCountryActivities(country);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', message: 'Activities sucesfully loaded', data: activities}))
        }

        const activities = await getAllDBActivities();
        return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', message: 'Activities sucesfully loaded', data: activities}))
    } catch (e: any) {  
        return res.status(e.status || 400).json(<ServerResponse>({status: 'error', message: e.message || e}));
    }
};

// ToDO: Save POI's in DB ¿Maybe?.

// export const getPOIsController: RequestHandler = async (req: Request, res: Response) => {

//     var amadeus = new Amadeus({
//         clientId: process.env.AMADEUS_CLIENT_ID,
//         clientSecret: process.env.AMADEUS_CLIENT_SECRET 
//     })

//     const pointsOfInterest = await amadeus.referenceData.locations.pointsOfInterest.get({
//         latitude : 41.397158,
//         longitude : 2.160873
//     })

//     res.status(200).send(<ServerResponse>{status: 'success', message: 'Activities sucesfully loaded', data: pointsOfInterest});
// };

// ToDO: City controller, service and route to add new cities to DB.

// export const saveCitiesController: RequestHandler = async (req: Request, res: Response) => {
    
//     try {
//         for(let i: number = 0; i < cities.length; i++){
//             const newCity = new City(cities[i]);
//             await newCity.save();
//         }

//         return res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//     }
// }
