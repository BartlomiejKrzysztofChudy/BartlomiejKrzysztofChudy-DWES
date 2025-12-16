import path from 'node:path';
import fs from 'node:fs';

import * as servicio from '../services/servicio-notas.js';
import { paginarDatos } from '../utils/paginacion.js';
import { config } from '../config.js';

export function getNotes(req, res) {
    try {
        const {
            filtro, orden, pagina, limite
        } = req.query;
        const listaCompleta = servicio.obtenerListaNotas(filtro, orden);
        const resultado = paginarDatos(listaCompleta, pagina, limite);

        res.json(resultado);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export function createNote(req, res) {
    try {
        const { nombre, contenido } = req.body;
        servicio.guardarNota(nombre, contenido);
        res.status(201).json({
            message: `Nota ${nombre} creada correctamente`
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export function getNote(req, res) {
    const nombre = req.params.name;
    const contenido = servicio.leerNota(nombre);

    if (contenido === null) {
        res.status(401).json({
            error: 'Nota no encontrada'
        });
    } else {
        res.json({
            name: nombre,
            content: contenido
        });
    }
}

export function updateNote(req, res) {
    createNote(req, res);
}

export function deleteNote(req, res) {
    const nombre = req.params.name;
    servicio.eliminarNota(nombre);
    res.json({
        message: 'Nota eliminada correctamente'
    });
}

export function downloadNote(req, res) {
    const nombre = req.params.name;

    const nombreCompleto = nombre.endsWith('.note') ? nombre : `${nombre}.note`;
    const rutaArchivo = path.join(config.notesDirectory, nombreCompleto);

    if (fs.existsSync(rutaArchivo)) {
        res.download(rutaArchivo);
    } else {
        res.status(404).json({
            error: 'Nota no encontrada para descargar'
        });
    }
}
