import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.route';
import express, { Application } from "express";
import passport from 'passport';
import passportMiddleware, { signInGoogleService, signInFacebookService } from './middlewares/passport';

import connectToDB from "./db";

connectToDB();

const app: Application = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(passport.initialize());
passport.use(passportMiddleware);
passport.use(signInGoogleService);
passport.use(signInFacebookService);

app.use('/', routes);

export default app;