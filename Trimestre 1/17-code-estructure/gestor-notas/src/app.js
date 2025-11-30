import { initLoaders } from './loaders/index.js';
import { applicationController } from './controllers/application-controller.js';
import { resolveCommand } from './routes/menu-routes.js';
import { noteController } from './controllers/note-controller.js';
import { logger } from './utils/logger.js';

export function startApplication() {
  initLoaders();

  const argument = process.argv[2];
  if (argument) {
      const command = resolveCommand(argument);
      if (command) {
           switch (command) {
              case 'CREATE':
                  noteController.createNote(applicationController.showMenu);
                  return;
              case 'EDIT':
                  noteController.editNote(applicationController.showMenu);
                  return;
              case 'DELETE':
                  noteController.deleteNote(applicationController.showMenu);
                  return;
              case 'EXIT':
                  applicationController.closeApplication();
                  return;
          }
      } else {
          logger.log('Argumento no reconocido');
      }
  }

  applicationController.showMenu();
}
