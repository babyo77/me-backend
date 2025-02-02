"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = saveMessage;
const message_model_1 = __importDefault(require("../models/message-model"));
const error_handler_1 = require("../handlers/error-handler");
const memory_1 = __importDefault(require("../cache/memory"));
function saveMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, message, image, del_image, ip } = req.body;
        // Validation logic
        if (!del_image ||
            !del_image.includes("https://") ||
            !image ||
            !image.includes("https://")) {
            throw new error_handler_1.ApiError("Fuck! something went wrong.", 400);
        }
        if (!message) {
            throw new error_handler_1.ApiError("Oops! You forgot to add a message.", 400);
        }
        if (typeof message !== "string") {
            throw new error_handler_1.ApiError("Yikes! That message doesn't look right.", 400);
        }
        if (message.length > 130) {
            throw new error_handler_1.ApiError("Whoa! Your message is too long.", 400);
        }
        if (name && name.length > 50) {
            throw new error_handler_1.ApiError("Name is too long.", 400);
        }
        const newMessage = new message_model_1.default({
            name,
            message,
            image,
            del_image,
            ip,
        });
        const savePromise = newMessage.save();
        // const emailPromise = api.get(
        //   `https://email-sender-beta-henna.vercel.app/email?e="devisantosh504@gmail.com"&m=${message}`
        // );
        yield Promise.allSettled([savePromise]);
        memory_1.default.del("messages");
        return res.status(204).send();
    });
}
