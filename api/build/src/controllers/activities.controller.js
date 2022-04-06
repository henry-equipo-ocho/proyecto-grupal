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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWatchedorBookedTimesController = exports.getActivitiesController = exports.updateAPIActivitiesController = exports.apiActivitiesController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const activities_services_1 = require("../services/activities.services");
const Amadeus = require('amadeus');
dotenv_1.default.config();
// Actividades de Buenos Aires
const apiActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const activities = yield (0, activities_services_1.getAPIActivitiesService)(req);
        for (let i = 0; i < activities.length; i++) {
            const activitiesFormat = {
                name: activities[i].name,
                description: activities[i].shortDescription,
                picture: activities[i].pictures ? activities[i].pictures[0] : null,
                city: req.body.city,
                country: req.body.country,
                price_currency: (_b = (_a = activities[i]) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.currencyCode,
                price_amount: (_d = (_c = activities[i]) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.amount,
                booking: (_e = activities[i]) === null || _e === void 0 ? void 0 : _e.bookingLink,
                watchedTimes: 0,
                bookedTimes: 0
            };
            const { name, description, picture, city, country, price_currency, price_amount, booking } = activitiesFormat;
            if (!name || !description || !picture || !city || !country || !price_currency || !price_amount || !booking) {
                continue;
            }
            ;
            yield (0, activities_services_1.saveActivitiesService)(activitiesFormat);
        }
        res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.apiActivitiesController = apiActivitiesController;
const updateAPIActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j, _k;
    try {
        const activities = yield (0, activities_services_1.getAPIActivitiesService)(req);
        for (let i = 0; i < activities.length; i++) {
            const activitiesFormat = {
                name: activities[i].name,
                description: activities[i].shortDescription,
                picture: activities[i].pictures ? activities[i].pictures[0] : null,
                city: req.body.city,
                country: req.body.country,
                price_currency: (_g = (_f = activities[i]) === null || _f === void 0 ? void 0 : _f.price) === null || _g === void 0 ? void 0 : _g.currencyCode,
                price_amount: (_j = (_h = activities[i]) === null || _h === void 0 ? void 0 : _h.price) === null || _j === void 0 ? void 0 : _j.amount,
                booking: (_k = activities[i]) === null || _k === void 0 ? void 0 : _k.bookingLink,
                watchedTimes: 0,
                bookedTimes: 0
            };
            const { name, description, picture, city, country, price_currency, price_amount, booking } = activitiesFormat;
            if (!name || !description || !picture || !city || !country || !price_currency || !price_amount || !booking) {
                continue;
            }
            ;
            yield (0, activities_services_1.saveActivitiesService)(activitiesFormat);
        }
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.updateAPIActivitiesController = updateAPIActivitiesController;
const getActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { country, city } = req.body;
    const noactivities = { status: 'success', message: 'Activities not found' };
    try {
        if (city) {
            const activities = yield (0, activities_services_1.getDBCityActivities)(country, city);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
        }
        if (country) {
            const activities = yield (0, activities_services_1.getDBCountryActivities)(country);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
        }
        const activities = yield (0, activities_services_1.getAllDBActivities)();
        return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.getActivitiesController = getActivitiesController;
const setWatchedorBookedTimesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, id } = req.body;
        yield (0, activities_services_1.setWatchedTimesService)(type, id);
        return res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(400);
    }
});
exports.setWatchedorBookedTimesController = setWatchedorBookedTimesController;
