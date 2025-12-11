import { noteService } from '../../services/note-service.js';
import archiver from 'archiver';

export const noteHttpController = {
    importNotes: (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'No se han subido archivos' });
            }

            const importedNotes = [];
            const errors = [];

            for (const file of req.files) {
                if (!file.originalname.endsWith('.note')) {
                    errors.push(`El archivo ${file.originalname} no tiene extensión .note`);
                    continue;
                }

                try {
                    const content = file.buffer.toString('utf8');
                    noteService.createNote(file.originalname, content);
                    importedNotes.push(file.originalname);
                } catch (err) {
                    errors.push(`Error al importar ${file.originalname}: ${err.message}`);
                }
            }

            res.status(201).json({
                message: 'Proceso de importación finalizado',
                imported: importedNotes,
                errors: errors.length > 0 ? errors : undefined
            });
        } catch (error) {
            res.status(500).json({ error: 'Error interno al importar notas' });
        }
    },

    exportNotes: (req, res) => {
        try {
            const { search, sort } = req.query;
            const result = noteService.listNotes({ search, sort, limit: 0 });
            const notes = result.data;

            if (notes.length === 0) {
                return res.status(404).json({ error: 'No se encontraron notas para exportar' });
            }

            if (notes.length === 1) {
                const noteName = notes[0];
                const content = noteService.readNote(noteName);
                
                res.setHeader('Content-Disposition', `attachment; filename="${noteName}"`);
                res.setHeader('Content-Type', 'text/plain');
                return res.send(content);
            }

            const archive = archiver('zip', {
                zlib: { level: 9 } 
            });

            res.setHeader('Content-Disposition', 'attachment; filename="notas.zip"');
            res.setHeader('Content-Type', 'application/zip');

            archive.pipe(res);

            for (const noteName of notes) {
                try {
                    const content = noteService.readNote(noteName);
                    archive.append(content, { name: noteName });
                } catch (err) {
                    console.error(`Error reading note ${noteName} for export`, err);
                }
            }

            archive.finalize();

        } catch (error) {
            res.status(500).json({ error: 'Error al exportar las notas' });
        }
    },

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