const NoteClient = require('./Struct/NoteClient');
const Client = new NoteClient();
const { Manager } = require('erela.js');
Client.erela = new Manager({
    nodes: Client.config.nodes,
    send(id, payload) {
        const guild = Client.guilds.cache.get(id)
        if(guild) guild.shard.send(payload)
    }
})

Client.initialize()