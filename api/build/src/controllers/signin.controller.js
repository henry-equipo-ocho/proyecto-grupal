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
exports.signInGoogleCallBackController = exports.signInGoogleFailureController = exports.signInGoogleController = exports.signInController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const signin_services_1 = require("../services/signin.services");
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('Missing values');
    }
    try {
        const token = yield (0, signin_services_1.signInServices)(req);
        return res.send(token);
    }
    catch (error) {
        return res.status(error.status || 400).json(error.message || error);
    }
});
exports.signInController = signInController;
exports.signInGoogleController = passport_1.default.authenticate('google', { scope: ['profile'] });
const signInGoogleFailureController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(401).send({ success: false, message: 'Error' });
});
exports.signInGoogleFailureController = signInGoogleFailureController;
exports.signInGoogleCallBackController = passport_1.default.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/google/failure'
});
