const { Listener } = require('discord-akairo');

module.exports = class trackStart extends Listener {
  constructor() {
    super('playerMove', {
      event: 'playerMove',
      emitter: 'erela',
    });
  }

  async exec(player, oldChannel, newChannel) {
    this.client.logger.info(newChannel ? `PLAYER MOVED TO [${newChannel}]` : 'SOMEONE DISCONNECTED ME FROM VOICECHANNEL');
    /* eslint no-param-reassign: "off" */
    if (!newChannel) return player.destroy();
    player.voiceChannel = newChannel;
    setTimeout(() => player.pause(false), 3000);
    return void 0
  }
};
