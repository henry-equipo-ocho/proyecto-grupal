"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_controller_1 = require("../controllers/signin.controller");
//
const verification_1 = __importDefault(require("../middlewares/verification"));
const router = (0, express_1.Router)();
router.post('/', verification_1.default, signin_controller_1.signInController);
router.get('/google', signin_controller_1.signInGoogleController);
router.get('/google/failure', signin_controller_1.signInGoogleFailureController);
router.get('/google/callback', signin_controller_1.signInGoogleCallBackController);
exports.default = router;
