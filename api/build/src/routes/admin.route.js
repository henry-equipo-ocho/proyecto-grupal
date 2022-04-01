"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/token', admin_controller_1.tokenVerifyController);
// User
router.put('/update/user', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.userUpdateController);
router.post('/create/user', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.createUserController);
router.delete('/delete/user', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.deleteUserController);
router.get('/users', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.getAllUsersController);
// Activity
router.put('/update/activity', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.activityUpdateController);
router.post('/create/activity', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.createActivityController);
router.delete('/delete/activity', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.deleteActivityController);
router.get('/activities', passport_1.default.authenticate('jwt', { session: false }), admin_controller_1.roleVerify, admin_controller_1.getAllActivitiesController);
exports.default = router;
