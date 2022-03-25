"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userUpdate_controller_1 = require("../controllers/userUpdate.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), userUpdate_controller_1.getUserCurrentInfoController);
router.post('/', passport_1.default.authenticate('jwt', { session: false }), userUpdate_controller_1.userUpdateController);
router.post('/password/', passport_1.default.authenticate('jwt', { session: false }), userUpdate_controller_1.passwordUpdateController);
exports.default = router;
