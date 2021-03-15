import dotenv from 'dotenv';
import NoteClient from './structures/NoteClient';
dotenv.config()
new NoteClient().login()