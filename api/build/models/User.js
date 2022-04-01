"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    surname: { type: String, required: [true, 'Missing surname attribute'] },
    email: { type: String, required: [true, 'Missing email attribute'] },
    country: { type: String, required: [true, 'Missing country attribute'] },
    password: { type: String, required: [true, 'Missing password attribute'] },
    role: { type: Number, required: [true, 'Missing role attribute'], default: 0 },
});
exports.default = mongoose_1.default.model('User', userSchema);
