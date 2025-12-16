import multer from 'multer';
import path from 'node:path';

import { config } from '../config.js';

const almacenamiento = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, config.notesDirectory);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

const filtroDeArchivos = (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.note') {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo se aceptan .note'));
    }
};

export const upload = multer({
    storage: almacenamiento,
    fileFilter: filtroDeArchivos
});
