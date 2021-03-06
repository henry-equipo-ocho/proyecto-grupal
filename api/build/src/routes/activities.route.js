"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activities_controller_1 = require("../controllers/activities.controller");
const orderbycity_controller_1 = require("../controllers/orderbycity.controller");
const orderbyprice_controller_1 = require("../controllers/orderbyprice.controller");
const match_controller_1 = require("../controllers/match.controller");
const router = (0, express_1.Router)();
router.post('/', activities_controller_1.getActivitiesController);
router.post('/amadeus', activities_controller_1.apiActivitiesController);
router.post('/orderByCity', orderbycity_controller_1.getOrderedCities);
router.get('/match/:word', match_controller_1.getMatchActivitiesController);
router.post('/orderByPrice', orderbyprice_controller_1.getOrderedPrice);
router.post('/watched', activities_controller_1.setWatchedorBookedTimesController);
exports.default = router;
