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
        console.log(query);
        return query.favActivities;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserFavorites = getUserFavorites;
const addUserFavorite = (userID, activityID, itineraryIndex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }
        console.log(user);
        if (!itineraryIndex || itineraryIndex > user.favActivities.length - 1) {
            console.log("pushing to a");
            user.favActivities.push([activityID]);
        }
        else {
            console.log("pushing to a[a]");
            user.favActivities[itineraryIndex].push(activityID);
        }
        yield user.save();
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.addUserFavorite = addUserFavorite;
const deleteUserFavorite = (userID, itineraryIndex, activityID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }
        if (activityID) {
            let res = User_models_1.default.findByIdAndUpdate(userID, { $pull: { "favActivities.$": { _id: activityID } } }, function (error, user) {
                if (error) {
                    throw error;
                }
                return true;
            });
            if (!res) {
                throw new Error(`User (${userID}) not found or activity (${activityID}) not found or itinerary (${itineraryIndex}) not found`);
            }
        }
        else {
        }
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserFavorite = deleteUserFavorite;
