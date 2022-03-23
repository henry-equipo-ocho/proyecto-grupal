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
exports.getPOIsController = exports.getActivitiesController = void 0;
const Amadeus = require('amadeus');
const dotenv_1 = __importDefault(require("dotenv"));
const Activity_models_1 = __importDefault(require("../models/Activity.models"));
dotenv_1.default.config();
// Actividades de Buenos Aires
const getActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    var amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const activities = yield amadeus.shopping.activities.get({
        latitude: req.body.lat,
        longitude: req.body.lon
    }).then((response) => response.data).catch((error) => error.code);
    for (let i = 0; i < activities.length; i++) {
        const activitiesFormat = {
            name: activities[i].name,
            description: activities[i].shortDescription,
            picture: activities[i].pictures ? activities[i].pictures[0] : null,
            city: req.body.city,
            country: req.body.country,
            price_currency: (_b = (_a = activities[i]) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.currencyCode,
            price_amount: (_d = (_c = activities[i]) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.amount,
            booking: (_e = activities[i]) === null || _e === void 0 ? void 0 : _e.bookingLink
        };
        const { name, description, picture, city, country, price_currency, price_amount, booking } = activitiesFormat;
        if (!name || !description || !picture || !city || !country || !price_currency || !price_amount || !booking) {
            continue;
        }
        ;
        const newActivity = new Activity_models_1.default(activitiesFormat);
        yield newActivity.save();
    }
    res.status(200).send({ status: 'success', message: 'Activities sucesfully loaded' });
});
exports.getActivitiesController = getActivitiesController;
const getPOIsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const pointsOfInterest = yield amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: 41.397158,
        longitude: 2.160873
    });
    res.status(200).send({ status: 'success', message: 'Activities sucesfully loaded', data: pointsOfInterest });
});
exports.getPOIsController = getPOIsController;
// export const saveCitiesController: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         for(let i: number = 0; i < cities.length; i++){
//             const newCity = new City(cities[i]);
//             await newCity.save();
//         }
//         return res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//     }
// }
