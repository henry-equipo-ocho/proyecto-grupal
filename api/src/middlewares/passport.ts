import dotenv from 'dotenv';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import User from '../models/User.models';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

dotenv.config();

const optStrategy: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

export default new Strategy(optStrategy, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) { return done(null, user) }
        return done(null, false);
    } catch (error) {
        done(null, false)
    }
});

export const signInGoogleService = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAINS}/signin/google/callback`
},
    async function (accessToken: any, refreshToken: any, profile: any, done: Function) {
        try {
            const user = await User.findOne({ email: profile._json?.email });
            if (user) { return done(null, profile) }
            return done(null, false);
        } catch (e) {
            throw e
        }
    }
);

export const signInFacebookService = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAINS}/signin/facebook/callback`,
    profileFields: ['id', 'displayName', 'email']
},
    async function (accessToken: any, refreshToken: any, profile: any, cb: Function) {
        try {
            const user = await User.findOne({ email: profile._json?.email });
            if (user) { return cb(null, profile) }
            return cb(null, false);
        } catch (e) {
            throw e
        }
    }
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});