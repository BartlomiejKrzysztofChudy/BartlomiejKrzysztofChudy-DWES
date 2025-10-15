const filesystem = require('fs');
const pathModule = require('path');
const readlineModule = require('readline');

const directorioNotas = pathModule.join(__dirname, 'notas');
if (!filesystem.existsSync(directorioNotas)) filesystem.mkdirSync(directorioNotas);

const interfazLectura = readlineModule.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenuPrincipal() {
    console.log('\n--- Editor de Notas ---');
    console.log('1. Crear nota');
    console.log('2. Editar nota ');
    console.log('3. Eliminar nota');
    console.log('4. Salir');

    interfazLectura.question('Selecciona una opción: ', opcionSeleccionada => {
        if (opcionSeleccionada === '1') {
            crearNuevaNota();
        } else if (opcionSeleccionada === '2') {
            editarNotaExistente();
        } else if (opcionSeleccionada === '3') {
            eliminarNotaExistente();
        } else if (opcionSeleccionada === '4') {
            interfazLectura.close();
        } else {
            console.log('Opción no válida.');
            mostrarMenuPrincipal();
        }
    });
}

function crearNuevaNota() {
    interfazLectura.question('Nombre de la nueva nota: ', nombreNota => {
        const rutaArchivoNota = pathModule.join(directorioNotas, nombreNota + '.note');
        console.log('Escribe el contenido de la nota');

        let contenidoNota = '';
        let lineasVacíasConsecutivas = 0;

        interfazLectura.on('line', lineaEscrita => {
            if (lineaEscrita.trim() === '') {
                lineasVacíasConsecutivas++;
            } else {
                lineasVacíasConsecutivas = 0;
            }

            if (lineasVacíasConsecutivas >= 2) {
                filesystem.writeFileSync(rutaArchivoNota, contenidoNota);
                console.log(`Nota "${nombreNota}" guardada correctamente.`);
                interfazLectura.removeAllListeners('line');
                mostrarMenuPrincipal();
            } else {
                contenidoNota += lineaEscrita + '\n';
            }
        });
    });
}

function editarNotaExistente() {
    const listaNotas = filesystem.readdirSync(directorioNotas).filter(nombreArchivo => nombreArchivo.endsWith('.note'));
    if (listaNotas.length === 0) {
        console.log('No hay notas disponibles para editar.');
        mostrarMenuPrincipal();
        return;
    }

    console.log('Notas disponibles:');
    listaNotas.forEach((nombreNota, indice) => console.log(`${indice + 1}. ${nombreNota}`));

    interfazLectura.question('Selecciona el número de la nota a editar: ', numeroSeleccionado => {
        const indiceNota = parseInt(numeroSeleccionado, 10) - 1;
        const rutaArchivoNota = pathModule.join(directorioNotas, listaNotas[indiceNota]);
        if (!filesystem.existsSync(rutaArchivoNota)) {
            console.log('Selección incorrecta');
            mostrarMenuPrincipal();
            return;
        }

        let contenidoNota = filesystem.readFileSync(rutaArchivoNota, 'utf8');
        console.log('Contenido actual de la nota:\n' + contenidoNota);
        console.log('Agrega nuevas líneas. Ingresa dos líneas vacías consecutivas para guardar.');

        let lineasVacíasConsecutivas = 0;

        interfazLectura.on('line', lineaEscrita => {
            if (lineaEscrita.trim() === '') {
                lineasVacíasConsecutivas++;
            } else {
                lineasVacíasConsecutivas = 0;
            }

            if (lineasVacíasConsecutivas >= 2) {
                filesystem.writeFileSync(rutaArchivoNota, contenidoNota);
                console.log(`Nota "${listaNotas[indiceNota]}" actualizada correctamente.`);
                interfazLectura.removeAllListeners('line');
                mostrarMenuPrincipal();
            } else {
                contenidoNota += lineaEscrita + '\n';
            }
        });
    });
}

function eliminarNotaExistente() {
    const listaNotas = filesystem.readdirSync(directorioNotas).filter(nombreArchivo => nombreArchivo.endsWith('.note'));
    if (listaNotas.length === 0) {
        console.log('No hay notas disponibles para eliminar.');
        mostrarMenuPrincipal();
        return;
    }

    console.log('Notas disponibles:');
    listaNotas.forEach((nombreNota, indice) => console.log(`${indice + 1}. ${nombreNota}`));

    interfazLectura.question('Selecciona el número de la nota a eliminar: ', numeroSeleccionado => {
        const indiceNota = parseInt(numeroSeleccionado, 10) - 1;
        const rutaArchivoNota = pathModule.join(directorioNotas, listaNotas[indiceNota]);
        if (filesystem.existsSync(rutaArchivoNota)) {
            filesystem.unlinkSync(rutaArchivoNota);
            console.log(`Nota "${listaNotas[indiceNota]}" eliminada correctamente.`);
        } else {
            console.log('Selección inválida.');
        }
        mostrarMenuPrincipal();
    });
}

mostrarMenuPrincipal();
