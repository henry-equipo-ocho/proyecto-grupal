"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_controller_1 = require("../controllers/signin.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/', signin_controller_1.signInController);
router.get('/google', passport_1.default.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }));
router.get('/google/failure', signin_controller_1.signInGoogleFailureController);
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/signin/google/failure' }), signin_controller_1.signInGoogleCallBackController);
exports.default = router;
