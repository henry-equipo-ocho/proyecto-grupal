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
exports.passwordUpdateController = exports.userUpdateController = exports.getUserCurrentInfoController = void 0;
const userUpdate_services_1 = require("../services/userUpdate.services");
const getUserCurrentInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, surname, email, country } = user;
        return res.status(200).send(({ status: 'success', data: { name, surname, email, country } }));
    }
    catch (e) {
        return res.status(400).send(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.getUserCurrentInfoController = getUserCurrentInfoController;
const userUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (req.body.password)
            return res.status(400).send(({ status: 'error', errors: { message: 'Invalid route to modified password' } }));
        if (Object.entries(req.body).length === 0)
            return res.status(400).send(({ status: 'error', errors: { message: 'No values to modified' } }));
        if (Object.keys(req.body).includes('role'))
            return res.status(400).send(({ status: 'error', errors: { message: 'No authorized to modified some props' } }));
        yield (0, userUpdate_services_1.updatePersonalInfo)(req, user.id);
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(400).send(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.userUpdateController = userUpdateController;
const passwordUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!req.body.password)
            return res.status(400).send(({ status: 'error', errors: { message: 'Missing new password value' } }));
        yield (0, userUpdate_services_1.updatePassword)(req.body.password, user.id);
        return res.status(200).send(({ status: 'success' }));
    }
    catch (e) {
        return res.status(400).send(({ status: 'error', errors: { message: e.message || e } }));
    }
});
exports.passwordUpdateController = passwordUpdateController;
