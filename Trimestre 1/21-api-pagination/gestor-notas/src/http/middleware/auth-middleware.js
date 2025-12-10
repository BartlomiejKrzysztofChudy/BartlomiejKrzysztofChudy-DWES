import bcrypt from 'bcrypt';
import { config } from '../../../config.js';

export default async function authMiddleware(req, res, next) {
    
    const authorization = req.headers.authorization;
    const user = req.headers.user; 

    if (!authorization || !user) {
        return res.status(401).json({
            error: "Acceso denegado: Faltan credenciales (Token o Usuario)"
        });
    }

    if (user !== config.security.adminName) {
        return res.status(403).json({
            error: "Acceso denegado: Usuario no autorizado"
        });
    }
    const token = authorization.slice(7);
    const isValid = await bcrypt.compare(token, config.security.tokenHash);

    if (!isValid) {
        return res.status(401).json({
            error: "Acceso denegado: Token inválido"
        });
    }
    next();
}