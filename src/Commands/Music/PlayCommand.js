const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
module.exports = class PlayCommand extends Command {
    constructor() {
    super('play', {
        aliases: ['play', 'p'],
        description: {
            content: 'Play some music.'
        },
        category: 'util',
        cooldown: 3000,
        args: [
            {
                id: 'query',
                type: 'string',
                match: 'rest'
            }
        ]
    });
  }
  async exec(msg, { query }) {
      const MusicTracks = await this.client.erela.search(query, msg.author)
      const player = await this.client.erela.create({
          guild: msg.guild.id,
          voiceChannel: msg.member.voice.channel.id,
          textChannel: msg.channel.id,
      })
      player.connect();
      player.queue.add(MusicTracks.tracks[0]);
      msg.channel.send(`Enqueuing track ${MusicTracks.tracks[0].title}.`);
      if (!player.playing && !player.paused && !player.queue.size)
      player.play();

    // For playlists you'll have to use slightly different if statement
    if (
      !player.playing &&
      !player.paused &&
      player.queue.totalSize === MusicTracks.tracks.length
    )
      player.play();
  }
}