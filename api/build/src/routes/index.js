"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const signup_1 = __importDefault(require("../routes/signup"));
const router = (0, express_1.Router)();
router.use((0, morgan_1.default)('dev'));
router.use(express_2.default.urlencoded({ extended: false }));
router.use('/signup', signup_1.default);
exports.default = router;
