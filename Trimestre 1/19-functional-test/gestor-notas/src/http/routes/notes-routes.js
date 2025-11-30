import express from 'express';
import { noteHttpController } from '../controllers/note-http-controller.js';

export const notesRouter = express.Router();

notesRouter.get('/', noteHttpController.listNotes);
notesRouter.get('/:name', noteHttpController.readNote);
notesRouter.post('/', noteHttpController.createNote);
notesRouter.patch('/:name', noteHttpController.appendNote);
notesRouter.delete('/:name', noteHttpController.deleteNote);
