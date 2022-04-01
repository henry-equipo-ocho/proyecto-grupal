"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controllers/signup.controller");
const verifyemail_controller_1 = require("../controllers/verifyemail.controller");
const router = (0, express_1.Router)();
router.post('/', signup_controller_1.signUpController);
router.get('/verify-email', verifyemail_controller_1.verifyEmail);
exports.default = router;
