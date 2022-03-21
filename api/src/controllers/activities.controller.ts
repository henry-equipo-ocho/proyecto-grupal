import { Request, Response } from 'express';
const Amadeus = require('amadeus');
import dotenv from 'dotenv';

dotenv.config();


// Actividades de Buenos Aires
export const amadeusController = async (req: Request, res: Response) => {

    var amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET 
    })

    const activities = await amadeus.shopping.activities.get({
        latitude: -34.599722,
        longitude: -58.381944
    }).then((response: any) => response.data).catch((error: any) => error.code);

    

     res.status(200).send(activities);
};