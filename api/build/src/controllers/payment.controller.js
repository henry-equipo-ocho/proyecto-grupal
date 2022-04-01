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
exports.captureOrder = exports.createOrder = void 0;
const payment_services_1 = require("../services/payment.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.cart) {
        return res.status(400).json(({ status: 'failed', errors: { message: 'Missing cart' } }));
    }
    try {
        const order = yield (0, payment_services_1.createPayPalOrder)(req.body.cart, req.user.id);
        if (order) {
            return res.status(201).json(({ status: 'success', data: order }));
        }
        return res.status(500).json(({ status: 'failed', errors: { message: 'there was an error' } }));
    }
    catch (error) {
        console.log("catch en el controller");
        return res.status(500).json(({ status: 'error', errors: { error } }));
    }
});
exports.createOrder = createOrder;
const captureOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.token === undefined) {
        return res.status(400).json(({ status: 'failed', errors: { message: 'Missing payment info' } }));
    }
    try {
        const captured = yield (0, payment_services_1.capturePayPalOrder)(req.query.token, "6245f427efea8b10cd71e615"); // ! erroring ID
        if (captured) {
            return res.status(200).json(({ status: 'success', data: captured }));
        }
        return res.status(500).json(({ status: 'failed', errors: { message: 'there was an error' } }));
    }
    catch (error) {
        return res.status(500).json(({ status: 'failed', errors: { serverError: error.message } }));
    }
});
exports.captureOrder = captureOrder;
