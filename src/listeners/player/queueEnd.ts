import {KirishimaPlayer} from '@kirishima/core';
import {ApplyOptions} from '@sapphire/decorators';
import {Listener} from '@sapphire/framework';
import {MessageEmbed} from 'discord.js';

@ApplyOptions<Listener.Options>({
  name: 'queueEnd',
  emitter: 'kirishima',
})

export class queueEnd extends Listener {
  public async run(player: KirishimaPlayer) {
    const channel = this.container.client.channels.cache.get(player.connection.textChannelId!);
    if (channel?.isText()) {
      await channel.send({
        embeds: [
          new MessageEmbed()
              .setDescription(`🎶 | The queue has ended please request a new track`)
              .setColor('BLURPLE'),
        ],
      });
    }
  }
}
