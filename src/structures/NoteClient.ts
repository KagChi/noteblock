import {SapphireClient} from '@sapphire/framework';
import {Intents} from 'discord.js';

import {Kirishima, KirishimaPlayerOptions, payload} from '@kirishima/core';
import {KirishimaQueue} from '@kirishima/queue';
import {join} from 'path';
import {LavalinkNode} from '../LavalinkNode';
import {KirishimaDeezer} from '@kirishima/deezer';

class NoteClient extends SapphireClient {
  public constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
      ],
      fetchPrefix: () => process.env.PREFIX!,
      loadMessageCommandListeners: true,
      caseInsensitivePrefixes: true,
      caseInsensitiveCommands: true,
      baseUserDirectory: join(__dirname, '..'),
    });
  }

  public kirishima = new Kirishima({
    nodes: LavalinkNode,
    send: (options: KirishimaPlayerOptions, payload: payload) => {
      const shard = this.ws.shards.get(options.shardId!);
      if (!shard) {
        const guild = this.guilds.cache.get(options.guildId);
        return guild?.shard.send(payload);
      }
      return shard.send(payload);
    },
    plugins: [
      new KirishimaDeezer(),
      new KirishimaQueue(),
    ],
  });
}

const client = new NoteClient();
client.login();

declare module 'discord.js' {
    export interface Client {
        kirishima: Kirishima;
    }
}
