/** ORIGINAL CODE https://github.com/zhycorp/disc-11/blob/main/src/utils/createEmbed.ts */
const { MessageEmbed } = require('discord.js');

const Color = {
  info: '#c6d7f5',
  warn: 'YELLOW',
  error: 'RED',
};
function CreateEmbed(color, message) {
  const embed = new MessageEmbed()
    .setColor(Color[color])
    .setFooter(`© カグチ ${new Date().getFullYear()}`);
  if (message) embed.setDescription(message);
  return embed;
}
module.exports = { CreateEmbed };
