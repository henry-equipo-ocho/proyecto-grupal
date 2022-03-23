"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activities_controller_1 = require("../controllers/activities.controller");
const router = (0, express_1.Router)();
router.get('/', activities_controller_1.getActivitiesController);
// router.get('/cities', saveCitiesController);
exports.default = router;
