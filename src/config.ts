export default {
    prefix: process.env.PREFIX,
    presence: {
        type: process.env.PRESENCE_TYPE?.toUpperCase() || 'LISTENING',
        activities: '{GUILDSIZE} Using NoteBlock !',
        streaming: process.env.PRESENCE_STREAMING?.toLocaleLowerCase() || false
    },
    nodes: [],
    ownerID: [] as string[]
}