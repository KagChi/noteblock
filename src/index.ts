import { logger } from './Util';
import dotenv from 'dotenv';
dotenv.config()
import NoteClient from './structures/NoteClient';
process.on("unhandledRejection", e => {
    logger.error("[UNHANDLED_REJECTION]: ", e);
});
new NoteClient().load()