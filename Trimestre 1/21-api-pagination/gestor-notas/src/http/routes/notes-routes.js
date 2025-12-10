import express from 'express';

import { noteHttpController } from '../controllers/note-http-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';

export const notesRouter = express.Router();

if (process.env.NODE_ENV !== 'test') {
  notesRouter.use(authMiddleware);
}

notesRouter.get('/', noteHttpController.listNotes);
notesRouter.get('/:name', noteHttpController.readNote);
notesRouter.post('/', noteHttpController.createNote);
notesRouter.patch('/:name', noteHttpController.appendNote);
notesRouter.delete('/:name', noteHttpController.deleteNote);

