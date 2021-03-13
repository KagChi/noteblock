"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const delay = (ms) => new Promise(res => setTimeout(res, ms));
exports.delay = delay;
