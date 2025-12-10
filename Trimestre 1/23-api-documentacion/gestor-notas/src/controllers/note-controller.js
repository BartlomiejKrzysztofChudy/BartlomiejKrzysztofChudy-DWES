import { getReadline } from '../loaders/readline-loader.js';
import { noteService } from '../services/note-service.js';
import { waitForDoubleEnter } from '../utils/input.js';
import { logger } from '../utils/logger.js';

function chooseNote(onSelect, onCancel) {
    const readline = getReadline();
    const notes = noteService.listNotes();
    if (notes.length === 0) {
        logger.log('No hay notas disponibles.');
        onCancel();
        return;
    }

    logger.log('Notas disponibles:');
    for (const [index, note] of notes.entries()) {
        logger.log(`${index + 1}. ${note}`);
    }

    readline.question('Selecciona el número de la nota: ', answer => {
        const selectedIndex = Number.parseInt(answer, 10) - 1;
        const isInvalidSelection = Number.isNaN(selectedIndex)
            || selectedIndex < 0
            || selectedIndex >= notes.length;

        if (isInvalidSelection) {
            logger.log('Selección incorrecta.');
            onCancel();
            return;
        }

        onSelect(notes[selectedIndex]);
    });
}

export const noteController = {
  createNote: (showMenuCallback) => {
    const readline = getReadline();
    readline.question('Nombre de la nueva nota: ', noteName => {
      if (!noteName) {
        logger.log('El nombre de la nota no puede estar vacío.');
        showMenuCallback();
        return;
      }

      logger.log('Escribe el contenido de la nota (dos líneas vacías para guardar).');

      waitForDoubleEnter(content => {
        noteService.createNote(noteName, content);
        logger.log(`Nota "${noteName}" guardada correctamente.`);
        showMenuCallback();
      });
    });
  },

  editNote: (showMenuCallback) => {
     chooseNote((noteName) => {
        const content = noteService.readNote(noteName);
        logger.log(`Contenido actual de la nota:\n${content}`);
        logger.log('Agrega nuevas líneas (dos líneas vacías para guardar).');

        waitForDoubleEnter(newContent => {
            noteService.appendNote(noteName, newContent);
            logger.log(`Nota "${noteName}" actualizada correctamente.`);
            showMenuCallback();
        });
     }, showMenuCallback);
  },

  deleteNote: (showMenuCallback) => {
      chooseNote((noteName) => {
          noteService.deleteNote(noteName);
          logger.log(`Nota "${noteName}" eliminada correctamente.`);
          showMenuCallback();
      }, showMenuCallback);
  }
};
