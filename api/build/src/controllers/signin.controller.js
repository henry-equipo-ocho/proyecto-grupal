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
const signin_services_1 = require("../services/signin.services");
const passport_1 = __importDefault(require("passport"));
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send({ status: 'failed', message: `Missing values` });
    try {
        const user = yield (0, signin_services_1.getUserService)(email);
        if (!user)
            return res.status(400).json({ status: 'failed', message: `User doesn't exists` });
        const match = yield (0, signin_services_1.matchUserPasswordService)(user, password);
        if (!match)
            return res.status(400).json({ status: 'failed', message: `Invalid password` });
        const token = (0, signin_services_1.createUserTokenService)(user);
        if (!token)
            return res.status(400).json({ status: 'failed', message: `Couldn't create token` });
        return res.status(200).json({ status: 'success', message: `Succesfull login`, data: token });
    }
    catch (e) {
        return res.status(e.status || 400).json({ status: e.status || 'failed', message: e.message || e });
    }
});
exports.signInController = signInController;
// Google sign in controller on development
exports.signInGoogleController = passport_1.default.authenticate('google', { scope: ['profile'] });
const signInGoogleFailureController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(401).send({ success: false, message: 'Error' });
});
exports.signInGoogleFailureController = signInGoogleFailureController;
exports.signInGoogleCallBackController = passport_1.default.authenticate('google', {
    // TODO: set up this URLs
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/google/failure'
});
