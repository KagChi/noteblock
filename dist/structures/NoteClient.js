"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
const path_1 = require("path");
const fs_1 = require("fs");
const { readdir } = fs_1.promises;
class NoteClient extends eris_1.CommandClient {
    constructor() {
        super(process.env.TOKEN, {
            allowedMentions: {
                everyone: false
            },
            intents: [
                "guilds",
                "guildMessages",
                "guildVoiceStates"
            ]
        }, {
            ignoreBots: true,
            ignoreSelf: true,
            prefix: 'n!'
        });
    }
    async loadListeners() {
        const listeners = await readdir(path_1.join(__dirname, "..", "listeners"));
        for (const listenerFile of listeners) {
            const listenerClass = require(`../listeners/${listenerFile}`).default;
            const listener = new listenerClass(this);
            this.on(listener.name, listener.exec.bind(listener));
        }
    }
    login() {
        this.loadListeners();
        this.connect();
    }
}
exports.default = NoteClient;
