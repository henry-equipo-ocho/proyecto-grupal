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
exports.signInFacebookService = exports.signInGoogleService = void 0;
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const User_models_1 = __importDefault(require("../models/User.models"));
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
dotenv_1.default.config();
const optStrategy = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
exports.default = new passport_jwt_1.Strategy(optStrategy, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_models_1.default.findById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        done(null, false);
    }
}));
exports.signInGoogleService = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/signin/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_models_1.default.findOne({ email: (_a = profile._json) === null || _a === void 0 ? void 0 : _a.email });
            if (user) {
                return done(null, profile);
            }
            return done(null, false);
        }
        catch (e) {
            throw e;
        }
    });
});
exports.signInFacebookService = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/signin/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
}, function (accessToken, refreshToken, profile, cb) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_models_1.default.findOne({ email: (_a = profile._json) === null || _a === void 0 ? void 0 : _a.email });
            if (user) {
                return cb(null, profile);
            }
            return cb(null, false);
        }
        catch (e) {
            throw e;
        }
    });
});
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
