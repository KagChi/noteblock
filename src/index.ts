import {Shard, ShardingManager} from 'discord.js';
import {resolve} from 'path';

const ShardingClient = new ShardingManager(resolve('dist', 'structures', 'NoteClient.js'), {
  token: process.env.DISCORD_TOKEN,
  mode: 'worker',
});

ShardingClient.on('shardCreate', (shard: Shard) => {
  console.log(`Launched shard with Id: [${shard.id}]`);
});

ShardingClient.spawn({timeout: -1});
