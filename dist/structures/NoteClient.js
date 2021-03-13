"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("../config"));
const path_1 = require("path");
class NoteClient extends discord_akairo_1.AkairoClient {
    constructor() {
        super({
            ownerID: config_1.default.ownerID,
            intents: discord_js_1.Intents.ALL
        }, {
            intents: discord_js_1.Intents.ALL,
            partials: ["REACTION", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER"],
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            prefix: config_1.default.prefix,
            defaultCooldown: 3000,
            directory: path_1.join(__dirname, '..', 'commands'),
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            argumentDefaults: {
                prompt: {
                    time: 15000,
                    ended: 'Command ended',
                    timeout: '`15` seconds has been passed!, timeout!',
                }
            }
        }).on('cooldown', async (message, command, remaining) => {
            const awaitMsg = await message.channel.send(Util_1.embed('info', `Please wait \`${remaining}\` seconds before using command again`));
            await Util_1.delay(remaining);
            awaitMsg.delete();
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.join(__dirname, '..', 'listeners')
        });
    }
    load() {
        //this.commandHandler.loadAll()
        this.listenerHandler.loadAll();
        this.login();
    }
}
exports.default = NoteClient;
