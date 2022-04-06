"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivityController = exports.activityUpdateController = exports.userUpdateController = exports.getAllActivitiesController = exports.deleteActivityController = exports.getAllUsersController = exports.deleteUserController = exports.createUserController = exports.tokenVerifyController = exports.roleVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const activities_services_1 = require("../services/activities.services");
const admin_services_1 = require("../services/admin.services");
const signup_services_1 = require("../services/signup.services");
const userUpdate_services_1 = require("../services/userUpdate.services");
const roleVerify = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    if (req.user.role !== 3) {
        return res.status(403).send('Forbidden');
    }
    next();
};
exports.roleVerify = roleVerify;
const tokenVerifyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const match = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return res.status(200).send(({ status: 'success', data: true }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.tokenVerifyController = tokenVerifyController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, surname, country, role } = req.body;
    if (!email || !password || !name || !surname || !country || role === undefined) {
        return res.status(400).send(({ status: 'failed', errors: { message: `Missing values` } }));
    }
    try {
        const newUser = yield (0, signup_services_1.signUpService)(req);
        if (!newUser)
            return res.status(400).json(({ status: 'failed', errors: { message: `Email already registered` } }));
        return res.status(200).json({ status: 'success' });
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.createUserController = createUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, admin_services_1.deleteUserService)(id);
        return res.status(200).json(({ status: 'success' }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.deleteUserController = deleteUserController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, admin_services_1.getAllUserService)();
        return res.status(200).json(({ status: 'success', data: users }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.getAllUsersController = getAllUsersController;
const deleteActivityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, admin_services_1.deleteActivityService)(id);
        return res.status(200).json(({ status: 'success' }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.deleteActivityController = deleteActivityController;
const getAllActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield (0, activities_services_1.getAllDBActivities)();
        return res.status(200).json(({ status: 'success', data: activities }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.getAllActivitiesController = getAllActivitiesController;
const userUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (req.body.password)
            yield (0, userUpdate_services_1.updatePassword)(req.body.password, id);
        if (Object.entries(req.body).length === 1 && req.body.password)
            return res.status(200).send(({ status: 'success' }));
        if (Object.entries(req.body).length === 0)
            return res.status(400).send(({ status: 'error', errors: { message: 'No values to modified' } }));
        req.body.password && delete req.body.password;
        yield (0, userUpdate_services_1.updatePersonalInfo)(req, id);
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(400).send(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.userUpdateController = userUpdateController;
const activityUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, activities_services_1.updateActivityInfo)(req, id);
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(400).send(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.activityUpdateController = activityUpdateController;
const createActivityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, picture, city, country, price_currency, price_amount, booking } = req.body;
    if (!name || !description || !picture || !country || !city || !price_currency || !price_amount || !booking) {
        return res.status(400).send(({ status: 'failed', errors: { message: `Missing values` } }));
    }
    const activitiesFormat = { name, description, picture, city, country, price_currency, price_amount, booking, watchedTimes: 0, bookedTimes: 0 };
    try {
        yield (0, activities_services_1.saveActivitiesService)(activitiesFormat);
        return res.status(200).json({ status: 'success' });
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.createActivityController = createActivityController;
