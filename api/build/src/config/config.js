"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/proyectogrupal',
        USER: process.env.MONGOBD_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
};
