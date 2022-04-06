import CityInterface from '../interfaces/City.interface';
import CountryInterface from '../interfaces/Country.interface';
import City from "../models/City.models";
import Country from "../models/Country.models";

export const getCitiesService = async (): Promise<any> => {
    try {
        const cities = await City.find();
        return cities;
    } catch (e) {
        throw e
    }
}

export const getCountriesService = async (): Promise<any> => {
    try {
        const cities = await Country.find();
        return cities;
    } catch (e) {
        throw e
    }
}

export const saveCityService = async (city: CityInterface): Promise<any> => {
    try {
        const newCity = new City(city);
        await newCity.save();
    } catch (e) {
        throw e
    }
}


export const saveCountryService = async (country: CountryInterface): Promise<any> => {
    try {
        const newCountry = new Country(country);
        await newCountry.save();
    } catch (e) {
        throw e
    }
}

export const getCountryByNameService = async (name: string): Promise<any> => {
    try {
        const country = await Country.findOne({ name: name });
        return country;
    } catch (e) {
        throw e
    }
}

export const getCityByNameService = async (name: string): Promise<any> => {
    try {
        const city = await City.findOne({ name: name });
        return city;
    } catch (e) {
        throw e
    }
}