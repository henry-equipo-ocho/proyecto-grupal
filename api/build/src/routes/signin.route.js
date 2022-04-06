"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const signin_controller_1 = require("../controllers/signin.controller");
const verification_1 = __importDefault(require("../middlewares/verification"));
const router = (0, express_1.Router)();
router.post('/', verification_1.default, signin_controller_1.signInController);
// Google sign in
router.get('/google', passport_1.default.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }));
router.get('/google/failure', signin_controller_1.signInSocialFailureController);
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/signin/google/failure' }), signin_controller_1.signInSocialCallBackController);
// Facebook sign in
router.get('/facebook', passport_1.default.authenticate('facebook', { scope: ['email', 'public_profile'], session: false }));
router.get('/facebook/failure', signin_controller_1.signInSocialFailureController);
router.get('/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/signin/facebook/failure' }), signin_controller_1.signInSocialCallBackController);
exports.default = router;
