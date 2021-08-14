const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class StopCommand extends Command {
  constructor() {
    super('stop', {
      aliases: ['stop'],
      description: {
        content: 'Stop playing music',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel to do this.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel same as me to do this.')] });
      GuildPlayers.destroy();
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | Stopped guild queue')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async executeSlash(interaction) {
    try {
      const GuildPlayers = this.client.erela.players.get(interaction.guild.id);
      if (!GuildPlayers) return interaction.editReply({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (!interaction.member.voice.channelId) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel to do this.')] });
      if (interaction.member.voice.channelId !== GuildPlayers.voiceChannel) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel same as me to do this.')] });
      GuildPlayers.destroy();
      return interaction.editReply({ embeds: [CreateEmbed('info', '👌 | Stopped guild queue')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
