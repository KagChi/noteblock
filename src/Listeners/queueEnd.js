const { Listener } = require('discord-akairo');
const { CreateEmbed } = require('../Utility/CreateEmbed');

module.exports = class queueEnd extends Listener {
  constructor() {
    super('queueEnd', {
      event: 'queueEnd',
      emitter: 'erela',
    });
  }

  exec(player) {
    const QueueChannel = this.client.channels.cache.get(player.textChannel);
    QueueChannel.send({ embeds: [CreateEmbed('info', '⏹  | queue has ended.')] });
    player.destroy();
  }
};
