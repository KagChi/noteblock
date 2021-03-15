import { CommandClient } from 'eris';
import { join } from 'path';
import { promises as fsPromises } from "fs";
import Listener from './Listener';
const { readdir } = fsPromises;
export default class NoteClient extends CommandClient {
    constructor() {
        super(process.env.TOKEN as string, {
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
        })
    }
    public async loadListeners() {
        const listeners = await readdir(join(__dirname, "..", "listeners"));
        for (const listenerFile of listeners) {
            const listenerClass = require(`../listeners/${listenerFile}`).default;
            const listener: Listener = new listenerClass(this);
            this.on(listener.name, listener.exec.bind(listener));
        }
    }
    public login() {
        this.loadListeners()
        this.connect()
    }
}