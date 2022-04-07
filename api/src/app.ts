import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from "express";
import morgan from 'morgan';
import passport from 'passport';
import corsOptions from './config/cors.config';
import connectToDB from "./db";
import passportMiddleware, { signInFacebookService, signInGoogleService } from './middlewares/passport';
import routes from './routes/index.route';
import dotenv from 'dotenv';
dotenv.config();

connectToDB();

const app: Application = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.DOMAINS); // update to match the domain you will make the request from
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