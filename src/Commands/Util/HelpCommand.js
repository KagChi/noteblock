
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
module.exports = class PingCommand extends Command {
    constructor() {
    super('help', {
        aliases: ['help'],
        description: {
            content: 'Gets the bot\'s help command'
        },
        category: 'Util',
        cooldown: 3000,
    });
  }
  async exec(msg) {
    const embed = CreateEmbed('info')
    .addField(`${this.client.user.username} command's`, `${this.client.config.prefix} [command]`)
        for (const category of this.handler.categories.values()) {
            embed.addField(category, `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(', ')}`);
        }
        return msg.channel.send(embed);

  }
}