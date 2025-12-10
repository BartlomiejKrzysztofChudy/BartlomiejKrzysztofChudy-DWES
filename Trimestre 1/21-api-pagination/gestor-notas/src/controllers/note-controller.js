import * as input from '../utils/input.js';
import { noteService } from '../services/note-service.js';
import { logger } from '../utils/logger.js';

const chooseNote = async () => {
  const { data: notes } = noteService.listNotes({ limit: 0 });
  
  if (notes.length === 0) {
    logger.log('No hay notas disponibles.');
    return null;
  }

  logger.log('Notas disponibles:');
  notes.forEach((note, index) => {
    logger.log(`${index + 1}. ${note}`);
  });

  const answer = await input.ask('Selecciona el número de la nota: ');
  const index = Number.parseInt(answer, 10) - 1;

  if (Number.isNaN(index) || index < 0 || index >= notes.length) {
    logger.log('Selección incorrecta.');
    return null;
  }

  return notes[index];
};

export const noteController = {
  createNote: async () => {
    const name = await input.ask('Nombre de la nueva nota: ');
    if (!name) {
      logger.log('El nombre de la nota no puede estar vacío.');
      return;
    }

    logger.log('Escribe el contenido de la nota (dos líneas vacías para guardar).');
    const content = await input.waitForDoubleEnter();
    
    try {
      noteService.createNote(name, content);
      logger.log(`Nota "${name}" guardada correctamente.`);
    } catch (error) {
      logger.log(`Error al guardar la nota: ${error.message}`);
    }
  },

  editNote: async () => {
    const noteName = await chooseNote();
    if (!noteName) return;

    const content = noteService.readNote(noteName);
    logger.log(`Contenido actual de la nota:\n${content}`);
    logger.log('Agrega nuevas líneas (dos líneas vacías para guardar).');

    const newContent = await input.waitForDoubleEnter();
    try {
      noteService.appendNote(noteName, newContent);
      logger.log(`Nota "${noteName}" actualizada correctamente.`);
    } catch (error) {
      logger.log(`Error al actualizar la nota: ${error.message}`);
    }
  },

  deleteNote: async () => {
    const noteName = await chooseNote();
    if (!noteName) return;

    try {
      noteService.deleteNote(noteName);
      logger.log(`Nota "${noteName}" eliminada correctamente.`);
    } catch (error) {
      logger.log(`Error al eliminar la nota: ${error.message}`);
    }
  }
};
