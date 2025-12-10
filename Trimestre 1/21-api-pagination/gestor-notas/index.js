import * as input from './utils/input.js';
import { noteController } from './controllers/note-controller.js';
import { logger } from './utils/logger.js';

const startClock = () => {
  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    process.title = `Gestor de Notas - ${now}`;
  }, 1000);
};

const main = async () => {
  startClock();
  const arg = process.argv[2];
  if (arg) {
    switch (arg.toUpperCase()) {
      case 'CREATE':
        await noteController.createNote();
        break;
      case 'EDIT':
        await noteController.editNote();
        break;
      case 'DELETE':
        await noteController.deleteNote();
        break;
      default:
        logger.log('Argumento no reconocido');
    }
    input.close();
    return;
  }

  let running = true;
  while (running) {
    logger.log('\n--- Editor de Notas ---');
    logger.log('1. Crear nota');
    logger.log('2. Editar nota');
    logger.log('3. Eliminar nota');
    logger.log('4. Salir');

    const option = await input.ask('Selecciona una opción: ');

    switch (option.trim()) {
      case '1':
        await noteController.createNote();
        break;
      case '2':
        await noteController.editNote();
        break;
      case '3':
        await noteController.deleteNote();
        break;
      case '4':
        running = false;
        break;
      default:
        logger.log('Opción no válida.');
    }
  }
  
  input.close();
  logger.log('Hasta pronto.');
};

main();
