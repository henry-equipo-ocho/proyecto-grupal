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
exports.signUpController = void 0;
const signup_services_1 = require("../services/signup.services");
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, surname, country } = req.body;
    if (!email || !password || !name || !surname || !country) {
        return res.status(400).send(({ status: 'failed', errors: { message: `Missing info` } }));
    }
    try {
        const newUser = yield (0, signup_services_1.signUpService)(req);
        if (!newUser)
            return res.status(400).json(({ status: 'failed', errors: { message: `Email already registered` } }));
        return res.status(200).json({ status: 'success' });
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.signUpController = signUpController;
