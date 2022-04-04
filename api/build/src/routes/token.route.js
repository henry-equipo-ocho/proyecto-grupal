"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const refreshToken_controller_1 = require("../controllers/refreshToken.controller");
const router = (0, express_1.Router)();
router.get('/', refreshToken_controller_1.handleRefreshToken);
router.get('/clear', refreshToken_controller_1.clearRefreshToken);
router.post('/protected', passport_1.default.authenticate('jwt', { session: false }), refreshToken_controller_1.protectedRoute);
exports.default = router;
