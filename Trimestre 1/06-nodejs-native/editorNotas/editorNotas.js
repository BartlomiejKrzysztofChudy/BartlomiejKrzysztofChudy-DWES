const fs = require('fs');
const path = require('path');
const readline = require('readline');


const notasDir = path.join(__dirname, 'notas');

if (!fs.existsSync(notasDir)) {
    fs.mkdirSync(notasDir);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log('\n--- Editor de Notas ---');
    console.log('1. Crear nueva nota');
    console.log('2. Editar nota existente');
    console.log('3. Eliminar nota');
    console.log('4. Salir');

    rl.question('Elige una opción: ', (respuesta) => {
        const opcion = parseInt(respuesta);
        menu(opcion);

        if (opcion !== 4) {
            mostrarMenu();
        } else {
            rl.close();
            console.log('¡Hasta luego!');
        }
    });
}


function menu(opcion) {
    switch (opcion) {
        case 1:
            crearNuevaNota();
            break;
        case 2:
            editarNotaExistente();
            break;
        case 3:
            eliminarNota();
            break;
        case 4:
            break; 
        default:
            console.log('Opción no válida');
            break;
    }
}

function crearNuevaNota() {
    rl.question('Nombre de la nueva nota: ', (nombre) => {
        const archivo = path.join(notasDir, nombre + '.note');

        console.log('Escribe tu nota. Para finalizar, ingresa dos líneas en blanco seguidas.');

        let contenido = '';
        let lineasEnBlanco = 0;

        rl.on('line', (input) => {
            if (input.trim() === '') {
                lineasEnBlanco++;
            } else {
                lineasEnBlanco = 0;
            }

            if (lineasEnBlanco >= 2) {
                fs.writeFileSync(archivo, contenido);
                console.log(`Nota "${nombre}" guardada.`);
                rl.removeAllListeners('line'); 
                mostrarMenu();
            } else {
                contenido += input + '\n';
            }
        });
    });
}

function editarNotaExistente() {
    const notas = fs.readdirSync(notasDir).filter(f => f.endsWith('.note'));

    if (notas.length === 0) {
        console.log('No hay notas para editar.');
        return;
    }

    console.log('Notas disponibles:');
    notas.forEach((nota, i) => console.log(`${i + 1}. ${nota}`));

    rl.question('Elige el número de la nota que quieres editar: ', (num) => {
        const index = parseInt(num) - 1;

        const archivo = path.join(notasDir, notas[index]);
        let contenido = fs.readFileSync(archivo, 'utf8');
        console.log('Contenido actual:');
        console.log(contenido);

        console.log('Escribe nuevas líneas para añadir. Para finalizar, ingresa dos líneas en blanco seguidas.');

        let lineasEnBlanco = 0;

        rl.on('line', (input) => {
            if (input.trim() === '') {
                lineasEnBlanco++;
            } else {
                lineasEnBlanco = 0;
            }

            if (lineasEnBlanco >= 2) {
                fs.writeFileSync(archivo, contenido);
                console.log(`Nota "${notas[index]}" actualizada.`);
                rl.removeAllListeners('line');
                mostrarMenu();
            } else {
                contenido += input + '\n';
            }
        });
    });
}


function eliminarNota() {
    const notas = fs.readdirSync(notasDir).filter(f => f.endsWith('.note'));

    if (notas.length === 0) {
        console.log('No hay notas para eliminar.');
        return;
    }

    console.log('Notas disponibles:');
    notas.forEach((nota, i) => console.log(`${i + 1}. ${nota}`));

    rl.question('Elige el número de la nota que quieres eliminar: ', (num) => {
        const index = parseInt(num) - 1;

        if (index < 0 || index >= notas.length) {
            console.log('Número inválido.');
            return;
        }

        const archivo = path.join(notasDir, notas[index]);
        fs.unlinkSync(archivo);
        console.log(`Nota "${notas[index]}" eliminada.`);
        mostrarMenu();
    });
}

mostrarMenu();
