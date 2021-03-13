"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./Util");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NoteClient_1 = __importDefault(require("./structures/NoteClient"));
process.on("unhandledRejection", e => {
    Util_1.logger.error("[UNHANDLED_REJECTION]: ", e);
});
new NoteClient_1.default().load();
