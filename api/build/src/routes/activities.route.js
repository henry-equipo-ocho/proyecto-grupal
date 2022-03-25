"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activities_controller_1 = require("../controllers/activities.controller");
const router = (0, express_1.Router)();
router.post('/', activities_controller_1.getActivitiesController);
router.post('/amadeus', activities_controller_1.apiActivitiesController);
exports.default = router;
