import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export function verificarToken(req, res, next) {
    const cabecera = req.headers.authorization;

    if (!cabecera) {
        return res.status(403).json({
            error: 'Acceso Dengado: Falta el Token'
        });
    }

    const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : cabecera;
    try {
        const datosUsuario = jwt.verify(token, config.jwtSecret);
        req.usuario = datosUsuario;
        return next();
    } catch (error) {
        console.error('Token verification failed:', error.message);

        return res.status(401).json({
            error: 'Token inválido o caducado'
        });
    }
}
