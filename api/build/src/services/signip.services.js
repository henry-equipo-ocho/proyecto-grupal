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
exports.signInServices = exports.createTokenService = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTokenService = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
exports.createTokenService = createTokenService;
const signInServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findOne({ email: req.body.email });
        if (!user) {
            return 'The user doesnt exists';
        }
        const match = yield user.comparePassword(req.body.password);
        if (match) {
            return { token: (0, exports.createTokenService)(user) };
        }
        return 'Password is incorrect';
    }
    catch (error) {
        throw error;
    }
});
exports.signInServices = signInServices;
