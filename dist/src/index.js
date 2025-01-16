"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../handlers/error-handler");
const router_1 = __importDefault(require("../router/v1/router"));
const run_server_1 = require("../helper/run-server");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Sex");
});
app.use("/api/v1", router_1.default);
app.use(error_handler_1.errorHandler);
(0, run_server_1.runServer)(app);
