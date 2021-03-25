const { Listener } = require('discord-akairo');

module.exports = class nodeDisconnect extends Listener {
    constructor() {
        super('nodeDisconnect', {
            event: 'nodeDisconnect',
            emitter: 'erela'
        });
    }
    exec(node) {
        this.client.loggerr.warn(`NODE [${node.options.identifier}] DISCONNECTED`)
    }
}