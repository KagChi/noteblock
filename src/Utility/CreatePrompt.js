const { stripIndents } = require('common-tags');

function CreatePrompt(prompt) {
  return stripIndents`
    **❔ |** *${prompt}*
    **🔘 |** *You have \`30\` seconds to decide*
    **🔘 |** *Type \`cancel\` to cancel*
    `;
}

module.exports = { CreatePrompt };
