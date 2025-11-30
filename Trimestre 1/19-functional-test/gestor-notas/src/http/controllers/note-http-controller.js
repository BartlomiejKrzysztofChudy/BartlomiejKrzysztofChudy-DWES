import { noteService } from '../../services/note-service.js';

function safeHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export const noteHttpController = {
  listNotes: safeHandler(async (req, res) => {
    const notes = noteService.listNotes();
    res.json({ notes });
  }),

  readNote: safeHandler(async (req, res) => {
    const { name } = req.params;
    const content = noteService.readNote(name);
    res.json({ name, content });
  }),

  createNote: safeHandler(async (req, res) => {
    const { name, content } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    noteService.createNote(name, content || '');
    res.status(201).json({ message: 'Note created', name });
  }),

  appendNote: safeHandler(async (req, res) => {
    const { name } = req.params;
    const { content } = req.body;
    if (content === undefined) return res.status(400).json({ error: 'Content is required' });
    noteService.appendNote(name, content);
    res.json({ message: 'Note updated', name });
  }),

  deleteNote: safeHandler(async (req, res) => {
    const { name } = req.params;
    noteService.deleteNote(name);
    res.json({ message: 'Note deleted', name });
  }),
};
