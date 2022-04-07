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
exports.getUserActivities = exports.setWatchedTimesService = exports.updateFieldActivitiesService = exports.updateActivityInfo = exports.getActivitiesFromArray = exports.getDBCityActivities = exports.getDBCountryActivities = exports.getAllDBActivities = exports.getActivityById = exports.updateActivitiesService = exports.saveActivitiesService = exports.getAPIActivitiesService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Activity_models_1 = __importDefault(require("../models/Activity.models"));
const Amadeus = require('amadeus');
dotenv_1.default.config();
const getAPIActivitiesService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var amadeus = new Amadeus({
            clientId: process.env.AMADEUS_CLIENT_ID,
            clientSecret: process.env.AMADEUS_CLIENT_SECRET
        });
        const activities = yield amadeus.shopping.activities.get({
            latitude: req.body.lat,
            longitude: req.body.lon,
            radius: 20
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
        const found = yield Activity_models_1.default.findOne({ name: activity.name });
        if (found)
            throw new Error('Activity already exists');
        const newActivity = new Activity_models_1.default(activity);
        yield newActivity.save();
    }
    catch (e) {
        throw e;
    }
});
exports.saveActivitiesService = saveActivitiesService;
const updateActivitiesService = (activity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const found = yield Activity_models_1.default.findOne({ name: activity.name });
        if (!found)
            throw new Error('Activity not found');
        const update = { price_currency: activity.price_currency, price_amount: activity.price_amount };
        yield found.update(update);
        yield found.save();
    }
    catch (e) {
        throw e;
    }
});
exports.updateActivitiesService = updateActivitiesService;
const getActivityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const found = yield Activity_models_1.default.findById(id);
        if (!found)
            throw new Error('Activity not found');
        return found;
    }
    catch (e) {
        throw e;
    }
});
exports.getActivityById = getActivityById;
const getAllDBActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawActivities = yield Activity_models_1.default.find().populate({
            path: 'ownerId',
            match: { activeSubscription: true },
            select: 'payments'
        });
        return [
            filterActivitiesByTier(rawActivities, 3, undefined),
            filterActivitiesByTier(rawActivities, 2, undefined),
            filterActivitiesByTier(rawActivities, 1, undefined),
            filterActivitiesByTier(rawActivities, undefined, true),
        ];
    }
    catch (e) {
        throw e;
    }
});
exports.getAllDBActivities = getAllDBActivities;
const getDBCountryActivities = (country) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawActivities = yield Activity_models_1.default.find({ country: country }).populate({
            path: 'ownerId',
            match: { activeSubscription: true },
            select: 'payments'
        });
        return [
            filterActivitiesByTier(rawActivities, 3, undefined),
            filterActivitiesByTier(rawActivities, 2, undefined),
            filterActivitiesByTier(rawActivities, 1, undefined),
            filterActivitiesByTier(rawActivities, undefined, true),
        ];
    }
    catch (e) {
        throw e;
    }
});
exports.getDBCountryActivities = getDBCountryActivities;
const getDBCityActivities = (country, city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawActivities = yield Activity_models_1.default.find({ country: country, city: city }).populate({
            path: 'ownerId',
            match: { activeSubscription: true },
            select: 'payments'
        });
        return [
            filterActivitiesByTier(rawActivities, 3, undefined),
            filterActivitiesByTier(rawActivities, 2, undefined),
            filterActivitiesByTier(rawActivities, 1, undefined),
            filterActivitiesByTier(rawActivities, undefined, true),
        ];
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
const updateActivityInfo = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condictions = { _id: id };
        const update = req.body;
        Activity_models_1.default.findOneAndUpdate(condictions, update, (error, result) => {
            if (error)
                return error;
            else
                return result;
        });
    }
    catch (e) {
        throw e;
    }
});
exports.updateActivityInfo = updateActivityInfo;
function filterActivitiesByTier(rawActivities, tier, onlyThirdParty) {
    if (onlyThirdParty) {
        return rawActivities.filter((activity) => !activity.ownerId);
    }
    else {
        return rawActivities.filter((activity) => {
            var _a, _b;
            if (typeof activity.ownerId !== 'undefined' && typeof activity.ownerId !== 'string' && ((_a = activity.ownerId) === null || _a === void 0 ? void 0 : _a.payments)) {
                return activity.ownerId && ((_b = activity.ownerId.payments.at(-1)) === null || _b === void 0 ? void 0 : _b.tier) === tier;
            }
            return false;
        });
    }
}
const updateFieldActivitiesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await Activity.updateMany([{$addFields: {'watchedTimes': 0, 'bookedTimes': 0, 'created': false, 'ownerId': '624ca156deffe80d892baeb7'}}]);
        // await Activity.updateMany({}, {$unset: {ownerId: 1}});
    }
    catch (e) {
        throw e;
    }
});
exports.updateFieldActivitiesService = updateFieldActivitiesService;
const setWatchedTimesService = (type, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const found = yield Activity_models_1.default.findOne({ _id: id });
        if (!found)
            throw new Error('Activity not found');
        if (type === 'watched') {
            found.watchedTimes = found.watchedTimes + 1;
            yield found.save();
            return found;
        }
        if (type === 'booked') {
            found.bookedTimes = found.bookedTimes + 1;
            yield found.save();
            return found;
        }
    }
    catch (e) {
        throw e;
    }
});
exports.setWatchedTimesService = setWatchedTimesService;
const getUserActivities = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Activity_models_1.default.find({ ownerId: id });
        return activities;
    }
    catch (e) {
        throw e;
    }
});
exports.getUserActivities = getUserActivities;
