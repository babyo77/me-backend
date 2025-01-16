"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_handler_1 = __importDefault(require("../../handlers/async-handler"));
const saveMessage_1 = __importDefault(require("../../functions/saveMessage"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const get_messages_1 = __importDefault(require("../../functions/get-messages"));
const router = express_1.default.Router();
router.post("/messages", (0, express_rate_limit_1.default)({
    windowMs: 1000 * 60 * 60 * 24,
    limit: 5,
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
}), (0, async_handler_1.default)(saveMessage_1.default));
router.get("/messages", (0, async_handler_1.default)(get_messages_1.default));
exports.default = router;
