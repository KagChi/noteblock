const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const ms = require('ms');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
const { version } = require('../../../package.json');

module.exports = class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: {
        content: 'Gets the bot\'s statistic',
      },
      category: 'Util',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      msg.channel.send(CreateEmbed('info', stripIndent`
System Statistics:
\`\`\`js
Operating System: ${process.platform}
Node.js: ${process.version}
Version: ${version}
Uptime: ${ms(this.client.uptime, { long: true })}
\`\`\`
Music Statistics:
\`\`\`css
Uptime: ${ms(this.client.erela.nodes.values().next().value.stats.uptime, { long: true })}
Playing Players: ${this.client.erela.nodes.values().next().value.stats.playingPlayers}
\`\`\`
`));
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed('warn', '⛔ | An error occured'));
    }
  }
};
