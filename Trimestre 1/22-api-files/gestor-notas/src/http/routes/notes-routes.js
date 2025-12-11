import express from 'express';
import multer from 'multer';

import { noteHttpController } from '../controllers/note-http-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';

const upload = multer({ storage: multer.memoryStorage() });

export const notesRouter = express.Router();

notesRouter.get('/export', noteHttpController.exportNotes);

if (process.env.NODE_ENV !== 'test') {
  notesRouter.use(authMiddleware);
}

notesRouter.post('/import', upload.array('notes'), noteHttpController.importNotes);

notesRouter.get('/', noteHttpController.listNotes);
notesRouter.get('/:name', noteHttpController.readNote);
notesRouter.post('/', noteHttpController.createNote);
notesRouter.patch('/:name', noteHttpController.appendNote);
notesRouter.delete('/:name', noteHttpController.deleteNote);

