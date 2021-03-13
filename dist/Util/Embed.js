"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embed = void 0;
const discord_js_1 = require("discord.js");
const hexColors = {
    info: '#c5d7f4',
    warn: 'YELLOW',
    error: 'RED'
};
function embed(type, message) {
    const embed = new discord_js_1.MessageEmbed()
        .setColor(hexColors[type]);
    if (message)
        embed.setDescription(message);
    return embed;
}
exports.embed = embed;
