const { Command, Argument } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class VolumeCommand extends Command {
  constructor() {
    super('Volume', {
      aliases: ['Volume'],
      description: {
        content: 'Change music volume',
      },
      category: 'Music',
      cooldown: 3000,
      args: [
        {
          id: 'volume',
          type: Argument.range('number', 1, 101),
          match: 'rest',
          prompt: {
            start: 'What new volume you want to change? between 1-100',
            retry: 'between 1-100',
          },
        },
      ],
    });
  }

  async exec(msg, { volume }) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel to do this.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel same as me to do this.')] });
      GuildPlayers.setVolume(volume);
      return msg.channel.send({ embeds: [CreateEmbed('info', `👌 | Set guild volume to \`${volume}\``)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
