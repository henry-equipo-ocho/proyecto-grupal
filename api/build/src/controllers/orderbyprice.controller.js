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
    if (country) {
        if (type && city) {
            let activities = yield (0, activities_services_1.getDBCityActivities)(country, city);
            if (type === 'Ascendent') {
                activities.forEach((byTier) => byTier.sort(function (a, b) {
                    return a.price_amount - b.price_amount;
                }));
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
            }
            else {
                activities.forEach((byTier) => byTier.sort(function (a, b) {
                    return b.price_amount - a.price_amount;
                }));
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
            }
        }
        ;
        if (city) {
            const activities = yield (0, activities_services_1.getDBCityActivities)(country, city);
            return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
        }
        ;
        if (type) {
            let activities = yield (0, activities_services_1.getDBCountryActivities)(country);
            if (type === 'Ascendent') {
                activities.forEach((byTier) => byTier.sort(function (a, b) {
                    return a.price_amount - b.price_amount;
                }));
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
            }
            else {
                activities.forEach((byTier) => byTier.sort(function (a, b) {
                    return b.price_amount - a.price_amount;
                }));
                return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
            }
        }
        ;
        let activities = yield (0, activities_services_1.getDBCountryActivities)(country);
        return !activities.length ? res.status(400).send(noactivities) : res.status(200).send(({ status: 'success', data: activities }));
    }
});
exports.getOrderedPrice = getOrderedPrice;
