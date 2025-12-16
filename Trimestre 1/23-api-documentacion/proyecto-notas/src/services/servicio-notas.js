import * as modelo from '../models/modelo-notas.js';

export function obtenerListaNotas(filtroNombre, orden) {
    let lista = modelo.obtenerTodas();

    if (!Array.isArray(lista)) {
        lista = [];
    }

    if (filtroNombre) {
        lista = lista.filter(function (nombreArchivo) {
            return nombreArchivo.toLowerCase().includes(filtroNombre.toLowerCase());
        });
    }

    if (orden === 'desc') {
        lista.sort().reverse();
    } else {
        lista.sort();
    }

    return lista;
}

export function leerNota(nombre) {
    if (!nombre) return null;

    const nombreCompleto = nombre.endsWith('.note') ? nombre : `${nombre}.note`;
    return modelo.leer(nombreCompleto);
}

export function guardarNota(nombre, contenido) {
    if (!nombre) {
        throw new Error('El nombre de la nota no puede estar vacio');
    }

    const nombreCompleto = nombre.endsWith('.note') ? nombre : `${nombre}.note`;
    modelo.guardar(nombreCompleto, contenido || '');
}

export function eliminarNota(nombre) {
    if (!nombre) return null;

    const nombreCompleto = nombre.endsWith('.note') ? nombre : `${nombre}.note`;
    modelo.eliminar(nombreCompleto);
    return true;
}
