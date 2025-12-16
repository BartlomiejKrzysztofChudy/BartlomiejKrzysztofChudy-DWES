import fs from 'node:fs';
import path from 'node:path';

import { config } from '../config.js';

export function obtenerTodas() {
    if (!fs.existsSync(config.notesDirectory)) {
        return [];
    }
    const archivos = fs.readdirSync(config.notesDirectory);

    return archivos.filter(function (archivo) {
        return archivo.endsWith('.note');
    });
}

export function leer(nombreNota) {
    const ruta = path.join(config.notesDirectory, nombreNota);

    if (fs.existsSync(ruta)) {
        return fs.readFileSync(ruta, 'utf8');
    }
    return null;
}

export function guardar(nombreNota, contenido) {
    const ruta = path.join(config.notesDirectory, nombreNota);
    fs.writeFileSync(ruta, contenido);
}

export function eliminar(nombreNota) {
    const ruta = path.join(config.notesDirectory, nombreNota);

    if (fs.existsSync(ruta)) {
        fs.unlinkSync(ruta);
    }
}
