const { Listener } = require('discord-akairo');

module.exports = class Raw extends Listener {
  constructor() {
    super('raw', {
      emitter: 'client',
      category: 'client',
      event: 'raw',
    });
  }

  exec(d) {
    this.client.erela.updateVoiceState(d);
  }
};
