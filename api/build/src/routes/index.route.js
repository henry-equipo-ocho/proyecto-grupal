"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const activities_route_1 = __importDefault(require("./activities.route"));
const admin_route_1 = __importDefault(require("./admin.route"));
const bussines_route_1 = __importDefault(require("./bussines.route"));
const locations_route_1 = __importDefault(require("./locations.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const signin_route_1 = __importDefault(require("./signin.route"));
const signup_route_1 = __importDefault(require("./signup.route"));
const token_route_1 = __importDefault(require("./token.route"));
const userFavorites_route_1 = __importDefault(require("./userFavorites.route"));
const userUpdate_route_1 = __importDefault(require("./userUpdate.route"));
const router = (0, express_1.Router)();
router.use((0, morgan_1.default)('dev'));
router.use(express_1.default.urlencoded({ extended: false }));
router.use('/signup', signup_route_1.default);
router.use('/signin', signin_route_1.default);
router.use('/activities', activities_route_1.default);
router.use('/favorites', userFavorites_route_1.default);
router.use('/update', userUpdate_route_1.default);
router.use('/locations', locations_route_1.default);
router.use('/admin', admin_route_1.default);
router.use('/payment', payment_route_1.default);
router.use('/token', token_route_1.default);
router.use('/business', bussines_route_1.default);
exports.default = router;
