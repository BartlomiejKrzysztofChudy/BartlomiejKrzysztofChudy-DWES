import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    // Aquí definimos la carpeta donde se guardarán los archivos .note
    notesDirectory: path.join(__dirname, '../notas'),

    // Leemos el secreto del .env (si no hay, usamos uno por defecto para que no falle)
    jwtSecret: process.env.JWT_SECRET || 'secreto',

    // El usuario administrador
    adminUser: process.env.ADMIN_USER || 'admin',

    adminPass: process.env.ADMIN_PASS || '1234'
};
