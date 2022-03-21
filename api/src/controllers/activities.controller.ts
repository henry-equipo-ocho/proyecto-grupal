import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
const Amadeus = require('amadeus');

// Actividades de Buenos Aires
export const amadeusController: RequestHandler = async (req: Request, res: Response) => {

    var amadeus = new Amadeus({
        // TODO: these should be environment variables
        clientId: 'OwaxoAtHCKCD5uateGJFssikTWyoHWNO',
        clientSecret: 'TGICwSH7oXB81kNQ'
    })

    const activities = await amadeus.shopping.activities.get({
        latitude: -34.599722,
        longitude: -58.381944
    }).then((response: any) => response.data).catch((error: any) => error.code);

    res.status(200).send(<ServerResponse>{status: 'success', message: 'Activities sucesfully loaded', data: activities});
};