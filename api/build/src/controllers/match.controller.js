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
exports.getMatchActivitiesController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const activities_services_1 = require("../services/activities.services");
dotenv_1.default.config();
const getMatchActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { word } = req.params;
    try {
        const activities = yield (0, activities_services_1.getAllDBActivities)();
        const matchactivities = activities.filter(ac => ac.name.toLowerCase().includes(word.toLowerCase()));
        return res.status(200).send(({ status: 'success', data: matchactivities }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', message: 'Invalid request' || e }));
    }
});
exports.getMatchActivitiesController = getMatchActivitiesController;
