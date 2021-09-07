const { Structure } = require('erela.js');
const WebSocket = require('ws');
const fetch = require('petitio');
const { version } = require('../../package.json');

class Node extends Structure.get('Node') {
  connect() {
    if (this.connected) return;

    const headers = {
      Authorization: this.options.password,
      'Num-Shards': String(this.manager.options.shards),
      'User-Id': this.manager.options.clientId,
      'Client-Name': this.manager.options.clientName,
      'User-Agent': `NoteBlock v${version}`,
    };

    this.socket = new WebSocket(
      `ws${this.options.secure ? 's' : ''}://${this.options.host}:${this.options.port
      }/`,
      { headers },
    );
    this.socket.on('open', this.open.bind(this));
    this.socket.on('close', this.close.bind(this));
    this.socket.on('message', this.message.bind(this));
    this.socket.on('error', this.error.bind(this));
  }

  async makeRequest(endpoint, modify) {
    endpoint = endpoint.replace(/^\//gm, '');

    const request = fetch(`http${this.options.secure ? 's' : ''}://${this.options.host}:${this.options.port}/${endpoint}`)
      .header('Authorization', this.options.password).header('User-Agent', `NoteBlock v${version}`);

    if (modify) {
      await modify(request);
    }

    this.calls++;
    return await request.json();
  }
}

Structure.extend('Node', () => Node);
