"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const bussines_controller_1 = require("../controllers/bussines.controller");
const router = (0, express_1.Router)();
// User
router.get('/activities', passport_1.default.authenticate('jwt', { session: false }), bussines_controller_1.roleVerify, bussines_controller_1.getBusinesActivities);
router.post('/activities', passport_1.default.authenticate('jwt', { session: false }), bussines_controller_1.roleVerify, bussines_controller_1.postBusinesActivities);
router.put('/activities', passport_1.default.authenticate('jwt', { session: false }), bussines_controller_1.roleVerify, bussines_controller_1.updateBusinessActivities);
router.delete('/activities', passport_1.default.authenticate('jwt', { session: false }), bussines_controller_1.roleVerify, bussines_controller_1.deleteBusinessActivity);
exports.default = router;
