"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'logs/noteblock.log',
            maxLogSize: 10 * 1024 * 1024,
            backups: 5,
            compress: true,
            encoding: 'utf-8',
            mode: 0o0640,
            flags: 'w+'
        },
        dateFile: {
            type: 'dateFile',
            filename: 'logs/noteblock.log',
            pattern: 'hh-dd-MM-yyyy',
            compress: true
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: { appenders: ['file', 'dateFile', 'out'], level: 'info' }
    }
});
exports.logger = log4js_1.default.getLogger('NOTEBLOCK');
