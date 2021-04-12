const { Manager } = require('erela.js');
const Spotify = require('./Plugin/Spotify'), Deezer = require('./Plugin/Deezer');
const NoteClient = require('./Struct/NoteClient');

const Client = new NoteClient();
if (Client.config.enablePlugin) {
  Client.erela = new Manager({
    autoPlay: true,
    nodes: Client.config.nodes,
    plugins: [
      new Deezer(),
      new Spotify({
        clientID: Client.config.spotifyClientID || null,
        clientSecret: Client.config.spotifySecret || null,
      }),
    ],
    send(id, payload) {
      const guild = Client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });
} else {
  Client.erela = new Manager({
    autoPlay: true,
    nodes: Client.config.nodes,
    send(id, payload) {
      const guild = Client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });
}

Client.initialize();
