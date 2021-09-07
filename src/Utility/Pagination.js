const EMOJIS = ['⏪', '⬅️', '🚫', '➡️', '⏩'];

module.exports = class Pagination {
  constructor(msg, payload) {
    this.msg = msg;
    this.payload = payload;
  }

  async start() {
    const { embed } = this.payload;
    const { pages } = this.payload;
    let index = 0;
    this.payload.edit.call(this, index, embed, pages[index]);
    const msg = await this.msg.channel.send({ embeds: [embed] });
    if (pages.length < 2) return undefined;
    for (const emoji of EMOJIS) await msg.react(emoji);
    const filter = (m, user) => EMOJIS.includes(m.emoji.name) && user.id === this.msg.author.id;
    while (true) {
      const responses = await msg.awaitReactions({ filter, max: 1, time: 30000 });
      if (!responses.size) break;
      const emoji = responses.first().emoji.name;
      if (emoji === EMOJIS[0]) index -= 10;
      else if (emoji === EMOJIS[1]) index--;
      else if (emoji === EMOJIS[3]) index++;
      else if (emoji === EMOJIS[4]) index += 10;
      else {
        msg.delete();
        break;
      }
      index = ((index % pages.length) + pages.length) % pages.length;
      this.payload.edit.call(this, index, embed, pages[index]);
      await msg.edit({ embeds: [embed] });
    }
  }
};
