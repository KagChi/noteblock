import { delay, embed }  from '../Util';
import { AkairoClient, Command, CommandHandler, ListenerHandler } from "discord-akairo";
import { Intents, Message } from "discord.js";
import config from '../config';
import { join } from 'path';
export default class NoteClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.ownerID,
            intents: Intents.ALL
        },{
            intents: Intents.ALL,
            partials: ["REACTION", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER"],
        })
    }
    public commandHandler = new CommandHandler(this, {
        prefix: config.prefix,
        defaultCooldown: 3000,
        directory: join(__dirname, '..', 'commands'),
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
    }).on('cooldown', async (message: Message, command: Command, remaining: number) => {
        const awaitMsg = await message.channel.send(embed('info', `Please wait \`${remaining}\` seconds before using command again`))
        await delay(remaining)
        awaitMsg.delete()
    })
    public listenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, '..', 'listeners')
    });
    public load() {
        //this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
        this.login()
    }
}