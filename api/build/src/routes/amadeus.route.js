"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amadeus_controller_1 = require("../controllers/amadeus.controller");
const router = (0, express_1.Router)();
router.get('/', amadeus_controller_1.amadeusController);
exports.default = router;
