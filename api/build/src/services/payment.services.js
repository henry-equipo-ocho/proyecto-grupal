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
const mongoose_1 = __importDefault(require("mongoose"));
const User_models_1 = __importDefault(require("../models/User.models"));
const User_interface_1 = require("../interfaces/User.interface");
dotenv_1.default.config();
const createPayPalOrder = (cart, userID) => __awaiter(void 0, void 0, void 0, function* () {
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
            return_url: process.env.CLIENT_APP_PAYMENT_SUCCESS,
            cancel_url: process.env.CLIENT_APP_PAYMENT_CANCEL,
        }
    };
    try {
        const response = yield axios_1.default.post(`${process.env.PAYPAL_URL}/v2/checkout/orders`, order, {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET,
            }
        });
        yield createPaymentInUserDB(userID, response, cart);
        return response.data.links.filter((link) => link.rel === "approve")[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createPayPalOrder = createPayPalOrder;
const capturePayPalOrder = (token, userID) => __awaiter(void 0, void 0, void 0, function* () {
    // https://developer.paypal.com/api/rest/reference/orders/v2/errors/
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(userID)) {
            console.log(mongoose_1.default.Types.ObjectId.isValid(userID));
            throw new Error(`Invalid user ID: ${userID}`);
        }
        console.log("boutta ask paypal");
        const response = yield axios_1.default.post(`${process.env.PAYPAL_URL}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET
            }
        });
        console.log("response.data:", response.data);
        if (response.data.status === 'COMPLETED') {
            let user = yield User_models_1.default.findById(userID);
            if (user === null) {
                throw new Error(`User (${userID}) not found`);
            }
            else {
                let payment = user.payments.find((payment) => payment.id === response.data.id);
                if (!payment) {
                    throw new Error(`Payment (${response.data.id}) not found`);
                }
                payment.status = "COMPLETED";
                user.role = User_interface_1.UserRoles.Business;
                user.activeSubscription = true;
                user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
                yield user.save();
                return true;
            }
        }
    }
    catch (error) {
        throw error;
    }
});
exports.capturePayPalOrder = capturePayPalOrder;
function createPaymentInUserDB(userID, response, cart) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User_models_1.default.findById(userID);
        if (user === null) {
            throw new Error(`User (${userID}) not found`);
        }
        else if (!user.payments.find((payment) => payment.id === response.data.id)) {
            user.payments.push({
                id: response.data.id,
                status: response.data.status,
                description: cart.description,
                tier: cart.tier,
            });
            user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
            yield user.save();
        }
        else {
            throw new Error(`Payment (${response.data.id}) already exists`);
        }
    });
}
