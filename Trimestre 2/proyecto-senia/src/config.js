import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

export const config = {

    // Leemos el secreto del .env (si no hay, usamos uno por defecto para que no falle)
    jwtSecret: process.env.JWT_SECRET || 'secreto',

    // El usuario administrador
    adminUser: process.env.ADMIN_USER || 'admin',

    adminPass: process.env.ADMIN_PASS || '1234',

};
