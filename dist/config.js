"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    prefix: process.env.PREFIX,
    presence: {
        type: process.env.PRESENCE_TYPE?.toUpperCase() || 'LISTENING',
        activities: '{GUILDSIZE} Using NoteBlock !',
        streaming: process.env.PRESENCE_STREAMING?.toLocaleLowerCase() || false
    },
    nodes: [],
    ownerID: []
};
