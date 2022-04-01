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
exports.signUpService = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer = require('nodemailer');
dotenv_1.default.config();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CREATOR,
        pass: process.env.PASS
    },
    tls: {
        rejectUnanthorized: false
    }
});
const signUpService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findOne({ email: req.body.email });
        if (user)
            throw new Error();
        const newUser = new User_models_1.default(req.body);
        yield newUser.save();
        var mailOptions = {
            from: ` "Verify your email" <${process.env.CREATOR}>`,
            to: newUser.email,
            subject: 'Verify your email',
            html: `<h2> ${newUser.name}! Thanks for registering on our site </h2>
                    <h4>Please verify your email to continue...</h4>
                    <a href="http://${req.headers.host}/signup/verify-email?id=${newUser.id}">Verify Your Email</a>`
        };
        // sending email
        yield transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Verification email is send to gmail account');
            }
        });
        // TODO: is it necessary to return the new user?
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.signUpService = signUpService;
