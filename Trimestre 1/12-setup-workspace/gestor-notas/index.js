import fs from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesDirectory = path.join(__dirname, 'notas');

if (!fs.existsSync(notesDirectory)) {
  fs.mkdirSync(notesDirectory, { recursive: true });
}

const readlineInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function closeApplication() {
  readlineInterface.close();
}

function processAction(argument) {
  if (!argument) return false;

  const normalizedAction = argument.trim().toLowerCase();
  const actions = {
    1: createNote,
    crear: createNote,
    c: createNote,
    2: editNote,
    editar: editNote,
    e: editNote,
    3: deleteNote,
    eliminar: deleteNote,
    borrar: deleteNote,
    4: closeApplication,
    salir: closeApplication,
    s: closeApplication,
  };

  const action = actions[normalizedAction];
  if (action) {
    action();
    return true;
  }

  return false;
}

function showMenu() {
  console.log('\n--- Editor de Notas ---');
  console.log('1. Crear nota');
  console.log('2. Editar nota');
  console.log('3. Eliminar nota');
  console.log('4. Salir');

  readlineInterface.question('Selecciona una opción: ', selectedOption => {
    if (!processAction(selectedOption)) {
      console.log('Opción no válida.');
      showMenu();
    }
  });
}

function waitForDoubleEnter(onComplete) {
  let noteContent = '';
  let emptyLineCounter = 0;

  const handleLine = typedLine => {
    if (typedLine.trim() === '') {
      emptyLineCounter += 1;
    } else {
      emptyLineCounter = 0;
    }

    if (emptyLineCounter >= 2) {
      readlineInterface.removeListener('line', handleLine);
      onComplete(noteContent);
    } else {
      noteContent += `${typedLine}\n`;
    }
  };

  readlineInterface.on('line', handleLine);
}

function createNote() {
  readlineInterface.question('Nombre de la nueva nota: ', noteName => {
    if (!noteName) {
      console.log('El nombre de la nota no puede estar vacío.');
      showMenu();
      return;
    }

    const notePath = path.join(notesDirectory, `${noteName}.note`);
    console.log('Escribe el contenido de la nota (dos líneas vacías para guardar).');

    waitForDoubleEnter(content => {
      fs.writeFileSync(notePath, content);
      console.log(`Nota "${noteName}" guardada correctamente.`);
      showMenu();
    });
  });
}

function listNotes() {
  const files = fs
    .readdirSync(notesDirectory)
    .filter(fileName => fileName.endsWith('.note'));

  return files;
}

function chooseNote(onSelect) {
  const notes = listNotes();
  if (notes.length === 0) {
    console.log('No hay notas disponibles.');
    showMenu();
    return;
  }

  console.log('Notas disponibles:');
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });

  readlineInterface.question('Selecciona el número de la nota: ', answer => {
    const selectedIndex = Number.parseInt(answer, 10) - 1;
    const isInvalidSelection = Number.isNaN(selectedIndex)
      || selectedIndex < 0
      || selectedIndex >= notes.length;

    if (isInvalidSelection) {
      console.log('Selección incorrecta.');
      showMenu();
      return;
    }

    const filePath = path.join(notesDirectory, notes[selectedIndex]);
    onSelect(filePath, notes[selectedIndex]);
  });
}

function editNote() {
  chooseNote((notePath, noteName) => {
    let noteContent = fs.readFileSync(notePath, 'utf8');
    console.log(`Contenido actual de la nota:\n${noteContent}`);
    console.log('Agrega nuevas líneas (dos líneas vacías para guardar).');

    waitForDoubleEnter(newContent => {
      noteContent += newContent;
      fs.writeFileSync(notePath, noteContent);
      console.log(`Nota "${noteName}" actualizada correctamente.`);
      showMenu();
    });
  });
}

function deleteNote() {
  chooseNote((notePath, noteName) => {
    fs.unlinkSync(notePath);
    console.log(`Nota "${noteName}" eliminada correctamente.`);
    showMenu();
  });
}

function startApplication() {
  const argument = process.argv[2];
  if (processAction(argument)) return;

  if (argument) {
    console.log('Argumento no reconocido. Iniciando menú interactivo.');
  }

  showMenu();
}

startApplication();

readlineInterface.on('close', () => {
  console.log('Hasta pronto.');
});
