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
exports.createRefreshTokenService = exports.createUserTokenService = exports.matchUserPasswordService = exports.getUserService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_models_1 = __importDefault(require("../models/User.models"));
dotenv_1.default.config();
const getUserService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findOne({ email: email });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserService = getUserService;
const matchUserPasswordService = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield user.comparePassword(password);
        return match;
    }
    catch (error) {
        throw error;
    }
});
exports.matchUserPasswordService = matchUserPasswordService;
const createUserTokenService = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });
};
exports.createUserTokenService = createUserTokenService;
const createRefreshTokenService = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
};
exports.createRefreshTokenService = createRefreshTokenService;
