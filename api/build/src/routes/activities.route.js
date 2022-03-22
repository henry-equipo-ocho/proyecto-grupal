"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activities_controller_1 = require("../controllers/activities.controller");
const router = (0, express_1.Router)();
router.get('/', activities_controller_1.amadeusController);
exports.default = router;
