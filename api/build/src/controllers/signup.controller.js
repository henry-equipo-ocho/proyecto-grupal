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
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.surname || !req.body.country) {
        return res.status(400).send('Missing values');
    }
    try {
        const newUser = yield (0, signup_services_1.signUpService)(req);
        return res.status(200).send(newUser); // TODO: user created
    }
    catch (error) {
        return res.status(error.status || 400).json(error.message || error);
    }
});
exports.signUpController = signUpController;
