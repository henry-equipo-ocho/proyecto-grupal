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
exports.verifyEmail = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const user = yield User_models_1.default.findById(id);
        if (user) {
            user.isVerified = true;
            yield user.save();
            res.redirect('http://localhost:3000/home'); // crear ruta para signin en rl front
        }
        else {
            res.redirect('http://localhost:3000/register');
            console.log('email is not verified');
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyEmail = verifyEmail;
