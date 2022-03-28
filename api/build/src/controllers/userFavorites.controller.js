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
exports.deleteUserActivitiesController = exports.addUserActivitiesController = exports.getUserActivitiesController = void 0;
const userFavorites_services_1 = require("../services/userFavorites.services");
const activities_services_1 = require("../services/activities.services");
const getUserActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user) {
        return res.status(400).json(({ status: 'failed', errors: { message: "Missing user auth" } }));
    }
    try {
        const userActivitiesID = yield (0, userFavorites_services_1.getUserFavorites)(((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || undefined);
        let activities = [];
        for (let i = 0; i < userActivitiesID.length; i++) {
            activities.push({ name: userActivitiesID[i].name, activities: yield (0, activities_services_1.getActivitiesFromArray)(userActivitiesID[i].activities) });
        }
        return res.status(200).json(({ status: 'success', data: activities }));
    }
    catch (error) {
        return res.status(400).json(({ status: 'error', errors: { message: error.message } }));
    }
});
exports.getUserActivitiesController = getUserActivitiesController;
const addUserActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || (req.body.activityID === undefined || req.body.itineraryIndex === undefined)) {
        console.log(req.user, req.body.activityID, req.body.itineraryIndex);
        return res.status(400).json(({ status: 'failed', errors: { message: "Missing user auth" } }));
    }
    try {
        const added = yield (0, userFavorites_services_1.addUserFavorite)(req.user._id, req.body.activityID, req.body.itineraryName);
        if (added) {
            console.log("added", added);
            return res.status(200).json(({ status: 'success', data: `Added activity (${req.body.activityID}) to favorites` }));
        }
        else {
            return res.status(409).json(({ status: 'failed', data: `Activity (${req.body.activityID}) already exists in itinerary (${req.body.itineraryName}})` }));
        }
    }
    catch (error) {
        console.log("error: ", error);
        return res.status(400).json(({ status: 'error', errors: { message: error.errors } }));
    }
});
exports.addUserActivitiesController = addUserActivitiesController;
const deleteUserActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || (req.body.activityID === undefined && req.body.itineraryIndex === undefined)) {
        return res.status(400).json(({ status: 'failed', errors: { message: "Missing info" } }));
    }
    try {
        const deleted = yield (0, userFavorites_services_1.deleteUserFavorite)(req.user._id, req.body.itineraryName, req.body.activityID);
        if (deleted) {
            return res.status(200).json(({ status: 'success', data: `Deleted activity (${req.body.activityID}) from favorites` }));
        }
        return res.status(409).json(({ status: 'failed', message: `Itinerary (${req.body.itineraryName}) or activity (${req.body.activityID}) not found` }));
    }
    catch (error) {
        return res.status(400).json(({ status: 'error', errors: { message: error.errors } }));
    }
});
exports.deleteUserActivitiesController = deleteUserActivitiesController;
