import * as NoteModel from '../models/note.js'; 

export const noteService = {
  createNote: (name, content) => {
    NoteModel.create(name, content);
  },
  listNotes: () => {
    return NoteModel.getAll();
  },
  readNote: (name) => {
      return NoteModel.read(name);
  },
  appendNote: (name, newContent) => {
      const currentContent = NoteModel.read(name);
      NoteModel.update(name, currentContent + newContent);
  },
  deleteNote: (name) => {
    NoteModel.remove(name);
  }
};
