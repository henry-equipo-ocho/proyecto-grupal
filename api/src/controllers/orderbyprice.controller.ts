import { Request, Response, RequestHandler } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import dotenv from 'dotenv';
import { getAllDBActivities, getDBCountryActivities, getDBCityActivities } from '../services/activities.services';

dotenv.config();



export const getOrderedPrice: RequestHandler = async (req: Request, res: Response) => {

    const {country, city, type} = req.body;
    const noactivities: ServerResponse = {status: 'success', message: 'Activities not found'} 

    if( type === 'Ascendent') {
        try {
            if(city) {
                const activities = await getDBCityActivities(country, city);
    
                const orderedActivities = activities.sort(function(a: any, b: any) {
                    return a.price_amount - b.price_amount
                })
    
    
                return !orderedActivities.length? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', data: orderedActivities}))
            }
            if(country) {
                const activities = await getDBCountryActivities(country);
    
                const orderedActivities = activities.sort(function(a: any, b: any) {
                    return a.price_amount - b.price_amount
                })
    
                return !orderedActivities.length? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', data: orderedActivities}))
            }
    
            const activities = await getAllDBActivities();
    
            const orderedActivities = activities.sort(function(a: any, b: any) {
                return a.price_amount - b.price_amount
            })
    
            return !orderedActivities.length? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', data: orderedActivities}))
           
        } catch (e: any) {  
            return res.status(e.status || 400).json(<ServerResponse>({status: 'error', message: 'Invalid Request'}));
        }
    }

    if( type === 'Descendent') {
        try {
            if(city) {
                const activities = await getDBCityActivities(country, city);
    
                const orderedActivities = activities.sort(function(a: any, b: any) {
                    return b.price_amount - a.price_amount
                })
    
    
                return !orderedActivities.length? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', data: orderedActivities}))
            }
            if(country) {
                const activities = await getDBCountryActivities(country);
    
                const orderedActivities = activities.sort(function(a: any, b: any) {
                    return b.price_amount - a.price_amount
                })
    
                return !orderedActivities.length? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', data: orderedActivities}))
            }
    
            const activities = await getAllDBActivities();
    
            const orderedActivities = activities.sort(function(a: any, b: any) {
                return b.price_amount - a.price_amount
            })
    
            return !orderedActivities.length? res.status(400).send(noactivities) : res.status(200).send(<ServerResponse>({status: 'success', data: orderedActivities}))
           
        } catch (e: any) {  
            return res.status(e.status || 400).json(<ServerResponse>({status: 'error', message: 'Invalid Request'}));
        }
    }
};