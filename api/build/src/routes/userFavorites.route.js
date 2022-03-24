"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userFavorites_controller_1 = require("../controllers/userFavorites.controller");
const router = (0, express_1.Router)();
router.get('/', userFavorites_controller_1.getUserActivitiesController);
router.post('/', userFavorites_controller_1.addUserActivitiesController);
router.delete('/', userFavorites_controller_1.deleteUserActivitiesController);
exports.default = router;
