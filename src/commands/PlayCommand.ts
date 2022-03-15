import {KirishimaPlayer, KirishimaTrack} from '@kirishima/core';
import {ApplyOptions} from '@sapphire/decorators';
import {Args, Command, isErr} from '@sapphire/framework';
import {Message, MessageEmbed} from 'discord.js';

@ApplyOptions<Command.Options>({
  name: 'play',
  description: 'Play a track in your voice channel',
  preconditions: ['isOnVoice', 'isJoinable'],
})

export class PlayCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const player = await this.container.client.kirishima.spawnPlayer({
      shardId: message.guild?.shardId,
      guildId: message.guildId!,
      channelId: message.member?.voice.channel?.id!,
      textChannelId: message.channel.id,
    }) as KirishimaPlayer;

    if (!player.connected) await player.connect();

    const userArgument = await args.restResult('string');

    if (isErr(userArgument)) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
              .setDescription(`❌ | Please provide a valid query`)
              .setColor('RED'),
        ],
      });
    }

    const {tracks, loadType, playlistInfo} = await this.container.client.kirishima.resolveTracks(userArgument.value);

    if (loadType === 'PLAYLIST_LOADED') {
      player.queue.add(tracks as KirishimaTrack[]);

      if (player.queue.totalSize === tracks.length) await player.playTrack();

      return message.channel.send({
        embeds: [
          new MessageEmbed()
              .setDescription(`✅ | Loaded ${tracks.length} tracks from ${playlistInfo?.name}`)
              .setColor('BLURPLE'),
        ],
      });
    }

    if (tracks.length) {
      player.queue.add(tracks[0] as KirishimaTrack);

      if (!player.playing && !player.queue.size) await player.playTrack();

      return message.channel.send({
        embeds: [
          new MessageEmbed()
              .setDescription(`✅ | Loaded ${tracks[0].info.title}`)
              .setColor('BLURPLE'),
        ],
      });
    }

    return message.channel.send({
      embeds: [
        new MessageEmbed()
            .setDescription(`❌ | Could not find any results`)
            .setColor('BLURPLE'),
      ],
    });
  }
}
