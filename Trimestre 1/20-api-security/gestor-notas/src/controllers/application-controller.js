import { getReadline, closeReadline } from '../loaders/readline-loader.js';
import { logger } from '../utils/logger.js';
import { resolveCommand } from '../routes/menu-routes.js';
import { noteController } from './note-controller.js';

export const applicationController = {
  showMenu: () => {
    logger.log('\n--- Editor de Notas ---');
    logger.log('1. Crear nota');
    logger.log('2. Editar nota');
    logger.log('3. Eliminar nota');
    logger.log('4. Salir');

    const readline = getReadline();
    readline.question('Selecciona una opción: ', selectedOption => {
      const command = resolveCommand(selectedOption);
      switch (command) {
          case 'CREATE':
              noteController.createNote(applicationController.showMenu);
              break;
          case 'EDIT':
              noteController.editNote(applicationController.showMenu);
              break;
          case 'DELETE':
              noteController.deleteNote(applicationController.showMenu);
              break;
          case 'EXIT':
              applicationController.closeApplication();
              break;
          default:
              logger.log('Opción no válida.');
              applicationController.showMenu();
      }
    });
  },

  closeApplication: () => {
      closeReadline();
      logger.log('Hasta pronto.');
      process.exit(0);
  }
};
