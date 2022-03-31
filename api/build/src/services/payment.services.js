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
exports.capturePayPalOrder = exports.createPayPalOrder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const createPayPalOrder = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("start", cart);
    const order = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: cart.price
                },
                description: cart.description
            }
        ],
        application_context: {
            brand_name: 'eztinerary',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: 'http://localhost:3001/payment/capture',
            cancel_url: 'http://localhost:3001/payment/cancel',
        }
    };
    console.log("created order");
    // const paypalAuthToken = createAuthToken();
    try {
        console.log("try axios");
        const response = yield axios_1.default.post(`${process.env.PAYPAL_URL}/v2/checkout/orders`, order, {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET,
            }
        });
        console.log("response.data:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("error in axios", error);
        throw error;
    }
});
exports.createPayPalOrder = createPayPalOrder;
const capturePayPalOrder = (token, PayerID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(token);
        const response = yield axios_1.default.post(`${process.env.PAYPAL_URL}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET
            }
        });
        console.log("response.data:", response.data);
    }
    catch (error) {
        console.log("capture error:");
        throw error;
    }
});
exports.capturePayPalOrder = capturePayPalOrder;
