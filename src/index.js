require('dotenv').config();
const NoteClient = require('./Struct/NoteClient');

const Client = new NoteClient();

Client.initialize();
