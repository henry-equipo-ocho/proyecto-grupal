"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_controller_1 = require("../controllers/signin.controller");
const router = (0, express_1.Router)();
router.post('/', signin_controller_1.signInController);
router.get('/google', signin_controller_1.signInGoogleController);
router.get('/google/failure', signin_controller_1.signInGoogleFailureController);
router.get('/google/callback', signin_controller_1.signInGoogleCallBackController);
exports.default = router;
