import dotenv from 'dotenv';
dotenv.config();

const whitelist = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    process.env.DOMAINS
];

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;