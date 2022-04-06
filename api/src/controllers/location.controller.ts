import { Request, RequestHandler, Response } from 'express';
import ServerResponse from '../interfaces/ServerResponse.interface';
import { getCitiesService, getCityByNameService, getCountriesService, getCountryByNameService, saveCityService, saveCountryService } from '../services/location.services';

export const getAllCitiesController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const cities = await getCitiesService();
        return res.status(200).send(<ServerResponse>({ status: 'success', data: cities }))
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
};

export const getAllCountriesController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const countries = await getCountriesService();
        return res.status(200).send(<ServerResponse>({ status: 'sucess', data: countries }))
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
};

export const saveCityController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, code, country, lat, lon } = req.body;
        if (!name || !code || !country || !lat || !lon) {
            return res.status(400).send(<ServerResponse>({ status: 'failed', errors: { message: 'Missing values' } }))
        }

        const city = await getCityByNameService(name);
        if (city) { return res.status(400).send(<ServerResponse>({ status: 'failed', errors: { message: 'City already exists' } })) }

        await saveCityService({ name, code, country, lat, lon });
        return res.status(200).send(<ServerResponse>({ status: 'success' }))
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }))
    }
}


export const saveCountryController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send(<ServerResponse>({ status: 'failed', errors: { message: 'Missing values' } }))
        }

        const country = await getCountryByNameService(name);
        if (country) { return res.status(400).send(<ServerResponse>({ status: 'failed', errors: { message: 'Country already exists' } })) }

        await saveCountryService({ name });
        return res.status(200).send(<ServerResponse>({ status: 'success' }))
    } catch (e: any) {
        return res.status(e.status || 400).json(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }))
    }
}