"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCountryController = exports.saveCityController = exports.getAllCountriesController = exports.getAllCitiesController = void 0;
const location_services_1 = require("../services/location.services");
const getAllCitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield (0, location_services_1.getCitiesService)();
        return res.status(200).send(({ status: 'success', data: cities }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.getAllCitiesController = getAllCitiesController;
const getAllCountriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, location_services_1.getCountriesService)();
        return res.status(200).send(({ status: 'sucess', data: countries }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.getAllCountriesController = getAllCountriesController;
const saveCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, code, country, lat, lon } = req.body;
        if (!name || !code || !country || !lat || !lon) {
            return res.status(400).send(({ status: 'failed', errors: { message: 'Missing info' } }));
        }
        const city = yield (0, location_services_1.getCityByNameService)(name);
        if (city) {
            return res.status(400).send(({ status: 'failed', errors: { message: 'City already exists' } }));
        }
        yield (0, location_services_1.saveCityService)({ name, code, country, lat, lon });
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.saveCityController = saveCityController;
const saveCountryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send(({ status: 'failed', errors: { message: 'Missing info' } }));
        }
        const country = yield (0, location_services_1.getCountryByNameService)(name);
        if (country) {
            return res.status(400).send(({ status: 'failed', errors: { message: 'Country already exists' } }));
        }
        yield (0, location_services_1.saveCountryService)({ name });
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.saveCountryController = saveCountryController;
