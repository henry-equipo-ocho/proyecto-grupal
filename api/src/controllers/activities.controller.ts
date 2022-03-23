import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
const Amadeus = require('amadeus');
import dotenv from 'dotenv';
import City from '../models/City.models';
import Activity from '../models/Activity.models';

dotenv.config();


// Actividades de Buenos Aires
export const getActivitiesController: RequestHandler = async (req: Request, res: Response) => {


    var amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET 
    });

    const activities = await amadeus.shopping.activities.get({
        latitude: req.body.lat,
        longitude: req.body.lon
    }).then((response: any) => response.data).catch((error: any) => error.code);

    for(let i: number = 0; i < activities.length; i++){
        const activitiesFormat = {
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

        const newActivity = new Activity(activitiesFormat);
        await newActivity.save();
    }
    
    res.status(200).send(<ServerResponse>{status: 'success', message: 'Activities sucesfully loaded'});
};

export const getPOIsController: RequestHandler = async (req: Request, res: Response) => {

    var amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET 
    })

    const pointsOfInterest = await amadeus.referenceData.locations.pointsOfInterest.get({
        latitude : 41.397158,
        longitude : 2.160873
      })

    res.status(200).send(<ServerResponse>{status: 'success', message: 'Activities sucesfully loaded', data: pointsOfInterest});
};

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
