const { Listener } = require('discord-akairo');
const { CreateEmbed } = require('../Utility/CreateEmbed');

module.exports = class trackStart extends Listener {
  constructor() {
    super('trackStart', {
      event: 'trackStart',
      emitter: 'erela',
    });
  }

  async exec(player, track) {
    const QueueChannel = this.client.channels.cache.get(player.textChannel);
    const sendMessage = await QueueChannel.send({ embeds: [CreateEmbed('info', `▶ | Now playing \`${track.title}\` [${track.requester}]`)] });
    if (track.isStream) return;
    setTimeout(() => sendMessage.delete(), track.duration);
  }
};
