"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = (0, express_1.Router)();
router.post('/create', passport_1.default.authenticate('jwt', { session: false }), payment_controller_1.createOrder);
router.get('/capture', /* passport.authenticate('jwt', { session: false }), */ payment_controller_1.captureOrder);
exports.default = router;
