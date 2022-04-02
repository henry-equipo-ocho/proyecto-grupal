"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = [
    'http://127.0.0.1:3000',
    'http://localhost:3000'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
exports.default = corsOptions;
