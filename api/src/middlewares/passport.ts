import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/User.models';
import passport from 'passport';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

const optStrategy: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

export default new Strategy(optStrategy, async (payload, done) => {
    const user = await User.findById(payload.id);
    try {
        if(user) {return done(null, user)}
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
});

export const signInGoogleService = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/signin/google/callback"
  },
  function(accessToken: any, refreshToken: any, profile: any, done: Function) {
    done(null, profile);
  }
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});