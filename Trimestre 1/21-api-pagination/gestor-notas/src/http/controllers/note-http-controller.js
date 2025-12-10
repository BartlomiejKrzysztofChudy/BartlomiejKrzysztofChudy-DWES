import { noteService } from '../../services/note-service.js';

export const noteHttpController = {
    listNotes: (req, res) => {
        try {
            const { page, limit, search, sort } = req.query;
            const result = noteService.listNotes({ page, limit, search, sort });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createNote: (req, res) => {
        try {
            const { name, content } = req.body;
            if (!name) {
                return res.status(400).json({ error: 'El nombre es obligatorio' });
            }
            noteService.createNote(name, content || '');
            res.status(201).json({ message: 'Nota creada', name });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la nota' });
        }
    },

    readNote: (req, res) => {
        try {
            const { name } = req.params;
            const content = noteService.readNote(name);
            res.json({ name, content });
        } catch (error) {
            res.status(404).json({ error: 'Nota no encontrada' });
        }
    },

    appendNote: (req, res) => {
        try {
            const { name } = req.params;
            const { content } = req.body;
            if (!content) {
                return res.status(400).json({ error: 'El contenido es obligatorio' });
            }
            noteService.appendNote(name, content);
            res.json({ message: 'Nota actualizada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteNote: (req, res) => {
        try {
            const { name } = req.params;
            noteService.deleteNote(name);
            res.json({ message: 'Nota eliminada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};