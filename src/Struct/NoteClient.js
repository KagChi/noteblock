const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const config = require('../config');
const { CreateEmbed } = require('../Utility/CreateEmbed');
module.exports = class NoteClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners
        }, {
            partials: ['CHANNEL','MESSAGE','GUILD_MEMBER'],
            ws: { intents: ['GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] }
        })
    }
    logger = require('../Utility/Logger').logger
    config = config
    
    commandHandler = new CommandHandler(this, {
        allowMention: false,
        directory: require('path').join(__dirname, '..', 'Commands'),
        prefix: config.prefix,
        defaultCooldown: 3000
    }).on('commandFinished', (msg, command, args) => {
        this.logger.info(`[${msg.author.tag}] USING [${command.id.toUpperCase()}] COMMANDS`)
    }).on('cooldown', async (msg, command, remaining) => {
        const awaitMsg = await msg.channel.send(CreateEmbed('warn', `Chill.. wait ${(remaining / 1000).toFixed(2)} second(s) to use command again`));
        setTimeout(() => awaitMsg.delete(), remaining)
        this.logger.warn(`[${msg.author.tag}] GETTING RATE LIMIT ON [${command.id.toUpperCase()}] COMMANDS`)
    })
    ListenerHandler = new ListenerHandler(this, {
        directory: require('path').join(__dirname, '..', 'Listeners')
    })
    initialize() {
        this.commandHandler.loadAll()
        this.ListenerHandler.setEmitters({
            erela: this.erela
        })
        this.ListenerHandler.loadAll()
        
        this.login()
    }
}
