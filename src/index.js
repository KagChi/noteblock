const { Manager } = require('erela.js');
const Spotify = require('./Plugin/Spotify');
const NoteClient = require('./Struct/NoteClient');

const Client = new NoteClient();
Client.erela = new Manager({
  autoPlay: true,
  nodes: Client.config.nodes,
  plugins: [
    new Spotify({
      clientID: Client.config.spotifyClientID,
      clientSecret: Client.config.spotifySecret,
    }),
  ],
  send(id, payload) {
    const guild = Client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});

Client.initialize();
