const { Listener } = require('discord-akairo');

module.exports = class nodeError extends Listener {
  constructor() {
    super('nodeError', {
      event: 'nodeError',
      emitter: 'erela',
    });
  }

  exec(node, error) {
    this.client.logger.warn(`NODE [${node.options.identifier}] ERROR`, error);
  }
};
