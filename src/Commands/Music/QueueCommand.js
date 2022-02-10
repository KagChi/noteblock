const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
const { chunk } = require('../../Utility/Chunk');
const Pagination = require('../../Utility/Pagination');

module.exports = class QueueCommand extends Command {
  constructor() {
    super('queue', {
      aliases: ['queue', 'q'],
      description: {
        content: 'get current guild queue',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (GuildPlayers.queue.size < 1) {
        return msg.reply({
          embeds: [CreateEmbed('info', `
            NowPlaying:
            \`\`\`css
            ${GuildPlayers?.queue.current?.title} | [${GuildPlayers?.queue.current?.requester.username}]
            \`\`\`
            Next Track:
            \`\`\`css
            ${GuildPlayers?.queue.values().next().value ? `${GuildPlayers.queue.values().next().value.title} | [${GuildPlayers.queue.values().next().value.requester.username}]` : 'None.'}
            \`\`\`
            `)],
        });
      }
      const pages = chunk(GuildPlayers?.queue.map((x, i) => `\`${i + 1}\` ${x.title} [${x.requester}]`), 7);
      const embed = CreateEmbed('info').setAuthor({
        name: `${msg.guild?.name} queue list`,
        iconURL: msg.guild.iconURL(),
      });
      await new Pagination(msg, {
        pages,
        embed,
        edit: (index, emb, page) => emb.setDescription(Array.isArray(page) ? page.join('\n') : page)
          .setFooter({ text: `Page ${index + 1} of ${pages.length}` }),
      }).start();
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
