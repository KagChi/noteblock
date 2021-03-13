"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const config_1 = __importDefault(require("../config"));
const Util_1 = require("../Util");
class readyListener extends discord_akairo_1.Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    async exec() {
        Util_1.logger.info('[CLIENT READY]');
        await this.client.user?.setActivity({
            name: config_1.default.presence.activities.replace('{GUILDSIZE}', this.client.guilds.cache.size),
            url: config_1.default.presence.streaming ? 'https://twitch.tv/discord' : '',
            type: config_1.default.presence.type
        });
    }
}
exports.default = readyListener;
