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
exports.getActivitiesFromArray = exports.getDBCityActivities = exports.getDBCountryActivities = exports.getAllDBActivities = exports.saveActivitiesService = exports.getAPIActivitiesService = void 0;
const Activity_models_1 = __importDefault(require("../models/Activity.models"));
const Amadeus = require('amadeus');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAPIActivitiesService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var amadeus = new Amadeus({
            clientId: process.env.AMADEUS_CLIENT_ID,
            clientSecret: process.env.AMADEUS_CLIENT_SECRET
        });
        const activities = yield amadeus.shopping.activities.get({
            latitude: req.body.lat,
            longitude: req.body.lon
        }).then((response) => response.data).catch((error) => error.code);
        return activities;
    }
    catch (e) {
        throw e;
    }
});
exports.getAPIActivitiesService = getAPIActivitiesService;
const saveActivitiesService = (activity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newActivity = new Activity_models_1.default(activity);
        yield newActivity.save();
    }
    catch (e) {
        throw e;
    }
});
exports.saveActivitiesService = saveActivitiesService;
const getAllDBActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Activity_models_1.default.find();
        return activities;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllDBActivities = getAllDBActivities;
const getDBCountryActivities = (country) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Activity_models_1.default.find({ country: country });
        return activities;
    }
    catch (e) {
        throw e;
    }
});
exports.getDBCountryActivities = getDBCountryActivities;
const getDBCityActivities = (country, city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Activity_models_1.default.find({ country: country, city: city });
        return activities;
    }
    catch (e) {
        throw e;
    }
});
exports.getDBCityActivities = getDBCityActivities;
const getActivitiesFromArray = (activitiesID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Activity_models_1.default.find({ '_id': { $in: activitiesID } });
    }
    catch (error) {
        throw error;
    }
});
exports.getActivitiesFromArray = getActivitiesFromArray;
