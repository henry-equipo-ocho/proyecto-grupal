"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    description: { type: String, required: [true, 'Missing description attribute'] },
    picture: { type: String, required: [true, 'Missing picture attribute'], unique: true, lowercase: true, trim: true },
    city: { type: String, required: [true, 'Missing city attribute'] },
    country: { type: String, required: [true, 'Missing country attribute'] },
    price_currency: { type: String, required: [true, 'Missing currency attribute'] },
    price_amount: { type: String, required: [true, 'Missing amount attribute'] }
});
exports.default = mongoose_1.default.model('Activity', activitySchema);
