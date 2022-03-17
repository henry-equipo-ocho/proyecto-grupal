"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controllers/signup.controller");
const router = (0, express_1.Router)();
router.post('/', signup_controller_1.signUpController);
exports.default = router;
