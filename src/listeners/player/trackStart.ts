import {KirishimaPartialTrack, KirishimaPlayer, KirishimaTrack} from '@kirishima/core';
import {ApplyOptions} from '@sapphire/decorators';
import {Listener} from '@sapphire/framework';
import {MessageEmbed} from 'discord.js';

@ApplyOptions<Listener.Options>({
  name: 'trackStart',
  emitter: 'kirishima',
})

export class trackStart extends Listener {
  public async run(player: KirishimaPlayer, track: KirishimaTrack | KirishimaPartialTrack) {
    const channel = this.container.client.channels.cache.get(player.connection.textChannelId!);
    if (channel?.isText()) {
      await channel.send({
        embeds: [
          new MessageEmbed()
              .setDescription(`🎶 | Now playing: ${track.info?.title}`)
              .setColor('BLURPLE'),
        ],
      });
    }
  }
}
