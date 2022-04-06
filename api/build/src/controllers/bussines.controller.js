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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusinessActivity = exports.updateBusinessActivities = exports.postBusinesActivities = exports.getBusinesActivities = exports.roleVerify = void 0;
const activities_services_1 = require("../services/activities.services");
const admin_services_1 = require("../services/admin.services");
const roleVerify = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    if (req.user.role !== 1) {
        return res.status(403).send('Forbidden');
    }
    next();
};
exports.roleVerify = roleVerify;
const getBusinesActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const activities = yield (0, activities_services_1.getUserActivities)(id);
    !activities ? res.status(400).send({ status: "failed", errors: { message: "Activities not found" } }) : res.status(200).send({ status: "success", data: activities });
});
exports.getBusinesActivities = getBusinesActivities;
const postBusinesActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const tier = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.payments) === null || _d === void 0 ? void 0 : _d.pop().tier;
        const { name, description, picture, city, country, price_currency, price_amount, booking } = req.body;
        if (!name || !description || !picture || !country || !city || !price_currency || !price_amount || !booking) {
            res.status(400).send({ status: "failed", errors: { message: "Missing values" } });
        }
        const activitiesFormat = { name, description, picture, city, country, price_currency, price_amount, booking, watchedTimes: 0, bookedTimes: 0, ownerId: id };
        if (tier === 3) {
            yield (0, activities_services_1.saveActivitiesService)(activitiesFormat);
            return res.status(200).send({ status: "success" });
        }
        const activities = yield (0, activities_services_1.getUserActivities)(id);
        if (tier === 1 && activities.length < 3) {
            yield (0, activities_services_1.saveActivitiesService)(activitiesFormat);
            return res.status(200).send({ status: "success" });
        }
        if (tier === 2 && activities.length < 5) {
            yield (0, activities_services_1.saveActivitiesService)(activitiesFormat);
            return res.status(200).send({ status: "success" });
        }
        return res.status(400).send({ status: "failed", errors: { message: "You have reached the limit of activities" } });
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.postBusinesActivities = postBusinesActivities;
const updateBusinessActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { id } = req.body;
        const activity = yield (0, activities_services_1.getActivityById)(id);
        if (activity.ownerId != ((_e = req.user) === null || _e === void 0 ? void 0 : _e.id)) {
            return res.status(400).send({ status: "failed", errors: { message: "You are not the owner of this activity" } });
        }
        ;
        yield (0, activities_services_1.updateActivityInfo)(req, id);
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(400).send(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.updateBusinessActivities = updateBusinessActivities;
const deleteBusinessActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const { id } = req.body;
        const activity = yield (0, activities_services_1.getActivityById)(id);
        if (activity.ownerId != ((_f = req.user) === null || _f === void 0 ? void 0 : _f.id)) {
            return res.status(400).send({ status: "failed", errors: { message: "You are not the owner of this activity" } });
        }
        ;
        yield (0, admin_services_1.deleteActivityService)(id);
        return res.status(200).json(({ status: 'success' }));
    }
    catch (e) {
        return res.status(e.status || 400).json(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.deleteBusinessActivity = deleteBusinessActivity;
