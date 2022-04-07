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
exports.deleteActivityService = exports.getAllUserService = exports.deleteUserService = void 0;
const Activity_models_1 = __importDefault(require("../models/Activity.models"));
const User_models_1 = __importDefault(require("../models/User.models"));
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findByIdAndDelete(id);
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.deleteUserService = deleteUserService;
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_models_1.default.find();
        return users;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllUserService = getAllUserService;
const deleteActivityService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield Activity_models_1.default.findByIdAndDelete(id);
        return activity;
    }
    catch (e) {
        throw e;
    }
});
exports.deleteActivityService = deleteActivityService;
