import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/User.models';

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
