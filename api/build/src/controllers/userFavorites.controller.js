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
    if (!req.body.userID) {
        res.status(400).json(({ status: 'failed', errors: { message: "Missing user ID" } }));
    }
    try {
        const userActivitiesID = yield (0, userFavorites_services_1.getUserFavorites)(req.body.userID);
        let activities = [];
        for (let i = 0; i < userActivitiesID.length; i++) {
            activities.push(yield (0, activities_services_1.getActivitiesFromArray)(userActivitiesID[i]));
        }
        res.status(200).json(({ status: 'success', data: activities }));
    }
    catch (error) {
        res.status(400).json(({ status: 'error', errors: { message: error.message } }));
    }
});
exports.getUserActivitiesController = getUserActivitiesController;
const addUserActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.userID || !req.body.activityID) {
        res.status(400).json(({ status: 'failed', errors: { message: "Missing info" } }));
    }
    try {
        yield (0, userFavorites_services_1.addUserFavorite)(req.body.userID, req.body.activityID, req.body.itineraryIndex);
        res.status(200).json(({ status: 'success', data: `Added activity (${req.body.activityID}) to favorites` }));
    }
    catch (error) {
        res.status(400).json(({ status: 'error', errors: { message: error.errors } }));
    }
});
exports.addUserActivitiesController = addUserActivitiesController;
const deleteUserActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.userID || !req.body.activityID) {
        res.status(400).json(({ status: 'failed', errors: { message: "Missing info" } }));
    }
    try {
        yield (0, userFavorites_services_1.deleteUserFavorite)(req.body.userID, req.body.itineraryIndex, req.body.activityID);
        res.status(200).json(({ status: 'success', data: `Deleted activity (${req.body.activityID}) from favorites` }));
    }
    catch (error) {
        res.status(400).json(({ status: 'error', errors: { message: error.errors } }));
    }
});
exports.deleteUserActivitiesController = deleteUserActivitiesController;
