import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.route';
import express, { Application } from "express";
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import connectToDB from "./db";

connectToDB();

const app: Application = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use('/', routes);

export default app;