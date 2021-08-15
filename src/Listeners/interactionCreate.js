const { Listener } = require('discord-akairo');
const { CreateEmbed } = require('../Utility/CreateEmbed');

module.exports = class interactionCreate extends Listener {
  constructor() {
    super('interactionCreate', {
      event: 'interactionCreate',
      emitter: 'client',
    });
  }

  /**
     *
     * @param {import('discord.js').Interaction} interaction
     */
  async exec(interaction) {
    /* eslint consistent-return: "off" */
    if (!interaction.isCommand()) return;
    if (!interaction.deferred) await interaction.deferReply();
    const command = this.client.commandHandler.modules.get(interaction.commandName);
    if (!command || !command.executeSlash) return interaction.editReply({ embeds: [CreateEmbed('info', `❌ command ${interaction.commandName} does not exist`)] });
    command.executeSlash(interaction);
  }
};
