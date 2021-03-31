const { Listener } = require('discord-akairo');

module.exports = class Readylistener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      category: 'client',
      event: 'ready',
    });
  }

  exec() {
    this.client.logger.info(`CLIENT READY WITH ${this.client.guilds.cache.size} GUILDS`);
    this.client.user.setActivity(`GrowNote's | ${this.client.config.prefix} help`, { type: 5 }).then((x) => {
      this.client.logger.info(`SET CLIENT PRESENCE TO ${x.activities[0]}`);
    });
    this.client.erela.init(this.client.user.id);
  }
};
