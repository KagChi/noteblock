const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('music, why not?')
    .addStringOption((input) => input.setName('query').setDescription('What music you want to play?').setRequired(true)),
  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('stop and destroy current player'),
  new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skip current playing track'),
  new SlashCommandBuilder()
    .setName('pause')
    .setDescription('pause current playing track'),
  new SlashCommandBuilder()
    .setName('resume')
    .setDescription('resume current paused track'),
];
