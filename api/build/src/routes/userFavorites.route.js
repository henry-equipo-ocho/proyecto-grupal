"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userFavorites_controller_1 = require("../controllers/userFavorites.controller");
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), userFavorites_controller_1.getUserActivitiesController);
router.post('/', passport_1.default.authenticate('jwt', { session: false }), userFavorites_controller_1.addUserActivitiesController);
router.delete('/', passport_1.default.authenticate('jwt', { session: false }), userFavorites_controller_1.deleteUserActivitiesController);
exports.default = router;
