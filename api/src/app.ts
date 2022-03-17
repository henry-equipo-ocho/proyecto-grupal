import express, { Application } from "express";

import connectToDB from "./db";

connectToDB();

const app: Application = express();
