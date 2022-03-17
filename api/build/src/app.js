"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/', index_route_1.default);
exports.default = app;
