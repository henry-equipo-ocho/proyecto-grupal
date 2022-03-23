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
const signUpService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findOne({ email: req.body.email });
        if (user)
            throw new Error();
        const newUser = new User_models_1.default(req.body);
        yield newUser.save();
        // TODO: is it necessary to return the new user?
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.signUpService = signUpService;
