const { Listener } = require('discord-akairo');

const allowedOpCodes = ['4006', '4015', '4011', '4012'];
module.exports = class socketClosed extends Listener {
  constructor() {
    super('socketClosed', {
      event: 'socketClosed',
      emitter: 'erela',
    });
  }

  /* eslint class-methods-use-this: "off" */
  exec(player, payload) {
    if (allowedOpCodes.includes(payload?.code)) {
      setTimeout(() => player.pause(), 1000);
      setTimeout(() => player.resume(), 2000);
      return true;
    }
    return undefined;
  }
};
