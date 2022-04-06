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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || 'erroringURI'; // TS won't allow a process.env
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, mongoose_1.connect)(MONGO_URI);
            console.log(`MongoDB connected to ${conn.connection.host}`);
        }
        catch (error) {
            console.error(`MongoDB connection failed: ${error}`);
            process.exit(1);
        }
    });
}
exports.default = connectToDB;
