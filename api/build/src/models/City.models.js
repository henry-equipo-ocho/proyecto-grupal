"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    code: { type: String, required: [true, 'Missing code attribute'] },
    country: { type: String, required: [true, 'Missing country attribute'] },
    lat: { type: String, required: [true, 'Missing lat attribute'] },
    lon: { type: String, required: [true, 'Missing lon attribute'] }
});
exports.default = mongoose_1.default.model('City', citySchema);
