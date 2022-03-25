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
exports.updatePassword = exports.updatePersonalInfo = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const updatePersonalInfo = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condictions = { _id: id };
        const update = req.body;
        User_models_1.default.findOneAndUpdate(condictions, update, (error, result) => {
            if (error)
                return error;
            else
                return result;
        });
    }
    catch (e) {
        throw e;
    }
});
exports.updatePersonalInfo = updatePersonalInfo;
const updatePassword = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        User_models_1.default.findById(id, function (err, doc) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return false;
                doc.password = req.body.password;
                yield doc.save();
            });
        });
    }
    catch (e) {
        throw e;
    }
});
exports.updatePassword = updatePassword;
