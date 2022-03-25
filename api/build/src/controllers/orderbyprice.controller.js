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
exports.getOrderedPrice = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const activities_services_1 = require("../services/activities.services");
dotenv_1.default.config();
const getOrderedPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { country, city, type } = req.body;
    const noactivities = { status: 'success', message: 'Activities not found' };
    if (type === 'Ascendent') {
        try {
            if (city) {
                const activities = yield (0, activities_services_1.getDBCityActivities)(country, city);
                const orderedActivities = activities.sort(function (a, b) {
                    return a.price_amount - b.price_amount;
                });
                return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: orderedActivities }));
            }
            if (country) {
                const activities = yield (0, activities_services_1.getDBCountryActivities)(country);
                const orderedActivities = activities.sort(function (a, b) {
                    return a.price_amount - b.price_amount;
                });
                return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: orderedActivities }));
            }
            const activities = yield (0, activities_services_1.getAllDBActivities)();
            const orderedActivities = activities.sort(function (a, b) {
                return a.price_amount - b.price_amount;
            });
            return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: orderedActivities }));
        }
        catch (e) {
            return res.status(e.status || 400).json(({ status: 'error', message: 'Invalid Request' }));
        }
    }
    if (type === 'Descendent') {
        try {
            if (city) {
                const activities = yield (0, activities_services_1.getDBCityActivities)(country, city);
                const orderedActivities = activities.sort(function (a, b) {
                    return b.price_amount - a.price_amount;
                });
                return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: orderedActivities }));
            }
            if (country) {
                const activities = yield (0, activities_services_1.getDBCountryActivities)(country);
                const orderedActivities = activities.sort(function (a, b) {
                    return b.price_amount - a.price_amount;
                });
                return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: orderedActivities }));
            }
            const activities = yield (0, activities_services_1.getAllDBActivities)();
            const orderedActivities = activities.sort(function (a, b) {
                return b.price_amount - a.price_amount;
            });
            return !orderedActivities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: orderedActivities }));
        }
        catch (e) {
            return res.status(e.status || 400).json(({ status: 'error', message: 'Invalid Request' }));
        }
    }
});
exports.getOrderedPrice = getOrderedPrice;
