"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_controller_1 = require("../controllers/signin.controller");
const router = (0, express_1.Router)();
router.post('/', signin_controller_1.signInController);
exports.default = router;
