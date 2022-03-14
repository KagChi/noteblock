import { KirishimaPlayer } from "@kirishima/core";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<Command.Options>({
    name: "join",
    description: "Let me joins a voice channel",
    preconditions: ["isOnVoice", "isJoinable"]
})

export class JoinCommand extends Command {
    public async messageRun(message: Message) {
        const player = await this.container.client.kirishima.spawnPlayer({
            shardId: message.guild?.shardId,
            guildId: message.guildId!,
            channelId: message.member?.voice.channel?.id!,
            textChannelId: message.channel.id,
        }) as KirishimaPlayer;

        if (!player.connected) await player.connect();
        
        return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`✅ | Joined ${message.member?.voice.channel?.toString()}`)
                    .setColor("BLURPLE")
            ]
        });
    }
}