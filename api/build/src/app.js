"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
// Initialization
const server = (0, express_1.default)();
server.set('port', process.env.PORT || 3001);
server.use((0, morgan_1.default)('dev'));
server.use((0, cors_1.default)());
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.get('/', (req, res) => {
    res.send(`API is at http://localhost:${server.get('port')}`);
});
server.use('/', index_1.default);
exports.default = server;
