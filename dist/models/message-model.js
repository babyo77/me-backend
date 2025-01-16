"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    del_image: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
        maxlength: 130,
    },
    canvas: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    username: {
        type: String,
        default: "tanmay",
    },
}, { timestamps: true });
const MessageModel = mongoose_1.default.model("Message", messageSchema);
exports.default = MessageModel;
