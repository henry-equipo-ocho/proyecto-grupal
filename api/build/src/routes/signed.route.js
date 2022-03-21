"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const signed_controller_1 = require("../controllers/signed.controller");
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), signed_controller_1.signedController);
exports.default = router;
