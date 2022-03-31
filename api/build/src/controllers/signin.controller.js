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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSocialCallBackController = exports.signInSocialFailureController = exports.signInController = void 0;
const signin_services_1 = require("../services/signin.services");
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send(({ status: 'failed', errors: { message: `Missing values` } }));
    try {
        const user = yield (0, signin_services_1.getUserService)(email);
        if (!user)
            return res.status(400).json(({ status: 'failed', errors: { message: `User doesn't exists` } }));
        const match = yield (0, signin_services_1.matchUserPasswordService)(user, password);
        if (!match)
            return res.status(400).json(({ status: 'failed', errors: { message: `Invalid password` } }));
        const token = (0, signin_services_1.createUserTokenService)(user);
        if (!token)
            return res.status(400).json(({ status: 'failed', errors: { message: `Couldn't create token` } }));
        return res.status(200).json({ status: 'success', data: token });
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.signInController = signInController;
const signInSocialFailureController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(400).redirect('http://localhost:3000/register/');
});
exports.signInSocialFailureController = signInSocialFailureController;
const signInSocialCallBackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._json) === null || _b === void 0 ? void 0 : _b.email;
    try {
        const user = yield (0, signin_services_1.getUserService)(email);
        const token = (0, signin_services_1.createUserTokenService)(user);
        if (!token)
            return res.status(400).json(({ status: 'failed', errors: { message: `Couldn't create token` } }));
        return res.status(200).json({ status: 'success', data: token });
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.signInSocialCallBackController = signInSocialCallBackController;
