import fs from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directorioNotas = path.join(__dirname, 'notas');
if (!fs.existsSync(directorioNotas)) fs.mkdirSync(directorioNotas, { recursive: true });

const interfazLectura = createInterface({
  input: process.stdin,
  output: process.stdout
});

function procesarAccionPorArgumento(argumento) {
  if (!argumento) return false;

  const accionNormalizada = argumento.trim().toLowerCase();
  const acciones = {
    '1': crearNuevaNota,
    crear: crearNuevaNota,
    c: crearNuevaNota,
    '2': editarNotaExistente,
    editar: editarNotaExistente,
    e: editarNotaExistente,
    '3': eliminarNotaExistente,
    eliminar: eliminarNotaExistente,
    borrar: eliminarNotaExistente,
    '4': () => interfazLectura.close(),
    salir: () => interfazLectura.close(),
    s: () => interfazLectura.close()
  };

  const accion = acciones[accionNormalizada];
  if (accion) {
    accion();
    return true;
  }
  return false;
}

function mostrarMenuPrincipal() {
  console.log('\n--- Editor de Notas ---');
  console.log('1. Crear nota');
  console.log('2. Editar nota');
  console.log('3. Eliminar nota');
  console.log('4. Salir');

  interfazLectura.question('Selecciona una opción: ', opcionSeleccionada => {
    if (!procesarAccionPorArgumento(opcionSeleccionada)) {
      console.log('Opción no válida.');
      mostrarMenuPrincipal();
    }
  });
}

function crearNuevaNota() {
  interfazLectura.question('Nombre de la nueva nota: ', nombreNota => {
    const rutaArchivoNota = path.join(directorioNotas, `${nombreNota}.note`);
    console.log('Escribe el contenido de la nota');

    let contenidoNota = '';
    let lineasVaciasConsecutivas = 0;

    const escribirLinea = lineaEscrita => {
      if (lineaEscrita.trim() === '') {
        lineasVaciasConsecutivas += 1;
      } else {
        lineasVaciasConsecutivas = 0;
      }

      if (lineasVaciasConsecutivas >= 2) {
        fs.writeFileSync(rutaArchivoNota, contenidoNota);
        console.log(`Nota "${nombreNota}" guardada correctamente.`);
        interfazLectura.removeListener('line', escribirLinea);
        mostrarMenuPrincipal();
      } else {
        contenidoNota += `${lineaEscrita}\n`;
      }
    };

    interfazLectura.on('line', escribirLinea);
  });
}

function editarNotaExistente() {
  const listaNotas = fs.readdirSync(directorioNotas).filter(nombreArchivo => nombreArchivo.endsWith('.note'));
  if (listaNotas.length === 0) {
    console.log('No hay notas disponibles para editar.');
    mostrarMenuPrincipal();
    return;
  }

  console.log('Notas disponibles:');
  let contador = 1;
  for (const nombreNota of listaNotas) {
    console.log(`${contador}. ${nombreNota}`);
    contador += 1;
  }

  interfazLectura.question('Selecciona el número de la nota a editar: ', numeroSeleccionado => {
    const indiceNota = Number.parseInt(numeroSeleccionado, 10) - 1;
    const rutaArchivoNota = path.join(directorioNotas, listaNotas[indiceNota]);
    if (!fs.existsSync(rutaArchivoNota)) {
      console.log('Selección incorrecta');
      mostrarMenuPrincipal();
      return;
    }

    let contenidoNota = fs.readFileSync(rutaArchivoNota, 'utf8');
    console.log('Contenido actual de la nota:\n' + contenidoNota);
    console.log('Agrega nuevas líneas. Ingresa dos líneas vacías consecutivas para guardar.');

    let lineasVaciasConsecutivas = 0;

    const escribirLinea = lineaEscrita => {
      if (lineaEscrita.trim() === '') {
        lineasVaciasConsecutivas += 1;
      } else {
        lineasVaciasConsecutivas = 0;
      }

      if (lineasVaciasConsecutivas >= 2) {
        fs.writeFileSync(rutaArchivoNota, contenidoNota);
        console.log(`Nota "${listaNotas[indiceNota]}" actualizada correctamente.`);
        interfazLectura.removeListener('line', escribirLinea);
        mostrarMenuPrincipal();
      } else {
        contenidoNota += `${lineaEscrita}\n`;
      }
    };

    interfazLectura.on('line', escribirLinea);
  });
}

function eliminarNotaExistente() {
  const listaNotas = fs.readdirSync(directorioNotas).filter(nombreArchivo => nombreArchivo.endsWith('.note'));
  if (listaNotas.length === 0) {
    console.log('No hay notas disponibles para eliminar.');
    mostrarMenuPrincipal();
    return;
  }

  console.log('Notas disponibles:');
  let contador = 1;
  for (const nombreNota of listaNotas) {
    console.log(`${contador}. ${nombreNota}`);
    contador += 1;
  }

  interfazLectura.question('Selecciona el número de la nota a eliminar: ', numeroSeleccionado => {
    const indiceNota = Number.parseInt(numeroSeleccionado, 10) - 1;
    const rutaArchivoNota = path.join(directorioNotas, listaNotas[indiceNota]);
    if (fs.existsSync(rutaArchivoNota)) {
      fs.unlinkSync(rutaArchivoNota);
      console.log(`Nota "${listaNotas[indiceNota]}" eliminada correctamente.`);
    } else {
      console.log('Selección inválida.');
    }
    mostrarMenuPrincipal();
  });
}

function iniciarAplicacion() {
  const argumentoCLI = process.argv[2];
  if (procesarAccionPorArgumento(argumentoCLI)) return;

  if (argumentoCLI) {
    console.log('Argumento no reconocido. Iniciando menú interactivo.');
  }
  mostrarMenuPrincipal();
}

iniciarAplicacion();

interfazLectura.on('close', () => {
  console.log('Hasta pronto.');
});
