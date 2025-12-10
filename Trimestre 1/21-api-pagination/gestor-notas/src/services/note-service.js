import * as NoteModel from '../models/note.js'; 

export const noteService = {
  createNote: (name, content) => {
    NoteModel.create(name, content);
  },
  listNotes: ({ page = 1, limit = 10, search = '', sort = 'asc' } = {}) => {
    let notes = NoteModel.getAll();

    // 1. Filtrado (Búsqueda por nombre)
    if (search) {
      const lowerSearch = search.toLowerCase();
      notes = notes.filter(note => note.toLowerCase().includes(lowerSearch));
    }

    // 2. Ordenación
    notes.sort((a, b) => {
      if (sort === 'desc') return b.localeCompare(a);
      return a.localeCompare(b);
    });

    // 3. Paginación
    // Si limit es 0, devolvemos todo (útil para CLI)
    const total = notes.length;
    const parsedLimit = Number(limit);
    
    let paginatedNotes = notes;
    if (parsedLimit > 0) {
        const startIndex = (Number(page) - 1) * parsedLimit;
        const endIndex = startIndex + parsedLimit;
        paginatedNotes = notes.slice(startIndex, endIndex);
    }

    return {
      data: paginatedNotes,
      meta: {
        total,
        page: Number(page),
        limit: parsedLimit,
        totalPages: parsedLimit > 0 ? Math.ceil(total / parsedLimit) : 1
      }
    };
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
