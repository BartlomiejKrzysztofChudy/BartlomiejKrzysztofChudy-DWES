import readline from 'node:readline';
import * as servicio from '../services/servicio-notas.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function iniciarConsola() {
    console.log('\n--- GESTOR DE NOTAS ---');
    console.log('1. Ver todas las notas');
    console.log('2. Crear una nota');
    console.log('3. Editar una nota');
    console.log('4. Leer una nota');
    console.log('5. Eliminar una nota');
    console.log('6. Salir');

    rl.question('Elige una opción: ', procesarOpcion);
}

function procesarOpcion(opcion) {
    switch (opcion) {
    case '1':
        mostrarNotas();
        break;
    case '2':
        preguntarNuevaNota();
        break;
    case '3':
        preguntarEditarNota();
        break;
    case '4':
        preguntarLeerNota();
        break;
    case '5':
        preguntarBorrarNota();
        break;
    case '6':
        console.log('¡Hasta luego!');
        rl.close();
        process.exit(0);
    default:
        console.log('Opción no válida.');
        iniciarConsola();
        break;
    }
}

function mostrarNotas() {
    try {
        const notas = servicio.obtenerListaNotas();
        if (notas.length === 0) console.log('No hay notas.');
        else {
            console.log('Tus notas:');
            notas.forEach(function (nota) { console.log(` - ${nota}`); });
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
    iniciarConsola();
}

function preguntarNuevaNota() {
    rl.question('Nombre de la nueva nota: ', function (nombre) {
        rl.question('Contenido: ', function (contenido) {
            try {
                servicio.guardarNota(nombre, contenido);
                console.log(`Nota "${nombre}" creada.`);
            } catch (error) {
                console.log('Error:', error.message);
            }
            iniciarConsola();
        });
    });
}

function preguntarEditarNota() {
    rl.question('¿Qué nota quieres editar?: ', function (nombre) {
        const contenidoActual = servicio.leerNota(nombre);

        if (contenidoActual === null) {
            console.log(' Esa nota no existe. Usa la opción "Crear" primero.');
            iniciarConsola();
        } else {
            console.log(`\nContenido actual: "${contenidoActual}"`);
            rl.question('Escribe el NUEVO contenido: ', function (nuevoContenido) {
                servicio.guardarNota(nombre, nuevoContenido);
                console.log(`Nota "${nombre}" actualizada.`);
                iniciarConsola();
            });
        }
    });
}

function preguntarLeerNota() {
    rl.question('¿Qué nota quieres leer?: ', function (nombre) {
        const contenido = servicio.leerNota(nombre);
        if (contenido) console.log(`CONTENIDO:${contenido}`);
        else console.log('Nota no encontrada.');
        iniciarConsola();
    });
}

function preguntarBorrarNota() {
    rl.question('¿Qué nota quieres borrar?: ', function (nombre) {
        servicio.eliminarNota(nombre);
        console.log(`Nota "${nombre}" eliminada.`);
        iniciarConsola();
    });
}
