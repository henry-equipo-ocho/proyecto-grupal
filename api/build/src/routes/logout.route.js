"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refreshToken_controller_1 = require("../controllers/refreshToken.controller");
const router = (0, express_1.Router)();
router.get('/', refreshToken_controller_1.handleRefreshToken);
router.get('/logout', refreshToken_controller_1.clearRefreshToken);
exports.default = router;
