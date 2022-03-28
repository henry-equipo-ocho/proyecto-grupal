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
exports.deleteUserFavorite = exports.addUserFavorite = exports.getUserFavorites = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const getUserFavorites = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield User_models_1.default.findById(userID, 'favActivities');
        if (!query) {
            throw new Error(`User (${userID}) not found`);
        }
        return query.favActivities;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserFavorites = getUserFavorites;
const addUserFavorite = (userID, activityID, itineraryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }
        let itineraryIndex = user.favActivities.findIndex((iti) => iti.name === itineraryName);
        if (itineraryIndex === -1) {
            user.favActivities.push(({ name: itineraryName ? itineraryName : `it-${Date.now()}`, activities: [activityID] }));
            console.log("user_favorites:", user.favActivities);
        }
        else {
            if (user.favActivities[itineraryIndex].activities.includes(activityID)) {
                return false;
            }
            console.log("pushing to a[a]");
            user.favActivities[itineraryIndex].activities.push(activityID);
            console.log(user.favActivities);
        }
        user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
        const saved = yield user.save();
        console.log(saved);
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.addUserFavorite = addUserFavorite;
const deleteUserFavorite = (userID, itineraryName, activityID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }
        let itineraryIndex = user.favActivities.findIndex((iti) => iti.name === itineraryName);
        if (itineraryIndex === -1) {
            return false;
        }
        if (activityID !== undefined) {
            let filteredItinerary = user.favActivities[itineraryIndex].activities.filter((activity) => activity !== activityID);
            console.log("filteredItinerary:", filteredItinerary);
            console.log(filteredItinerary.length, user.favActivities[itineraryIndex].activities.length);
            if (filteredItinerary.length === user.favActivities[itineraryIndex].activities.length) {
                return false;
            }
            if (filteredItinerary.length > 0) {
                user.favActivities[itineraryIndex].activities = filteredItinerary;
                console.log("mod fav[i]");
            }
            else {
                user.favActivities.splice(itineraryIndex, 1);
            }
        }
        else {
            user.favActivities.splice(itineraryIndex, 1);
        }
        console.log("user.favActivities", user.favActivities);
        user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
        yield user.save();
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserFavorite = deleteUserFavorite;
