"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const NoteClient_1 = __importDefault(require("./structures/NoteClient"));
dotenv_1.default.config();
new NoteClient_1.default().login();
