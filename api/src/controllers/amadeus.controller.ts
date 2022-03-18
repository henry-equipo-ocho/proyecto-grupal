import { Request, Response } from 'express';
const Amadeus = require('amadeus');

export const amadeusController = async (req: Request, res: Response) => {

    var amadeus = new Amadeus({
        clientId: 'OwaxoAtHCKCD5uateGJFssikTWyoHWNO',
        clientSecret: 'TGICwSH7oXB81kNQ'
    })

    const activities = await amadeus.shopping.activities.get({
        latitude: -34.599722,
        longitude: -58.381944
    }).then((response: any) => response.data).catch((error: any) => error.code)
    ;

    res.send(activities);
};