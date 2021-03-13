import { MessageEmbed } from "discord.js";
type hexColorsType = "info" | "warn" | "error";
const hexColors: Record<hexColorsType, string> = {
    info: '#c5d7f4',
    warn: 'YELLOW',
    error: 'RED'
};

export function embed(type: hexColorsType, message?: string): MessageEmbed {
    const embed = new MessageEmbed()
        .setColor(hexColors[type]);
        if (message) embed.setDescription(message);
        return embed;
    }