import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';

export function login(req, res) {
    const { usuario, password } = req.body;

    if (usuario !== config.adminUser) {
        return res.status(401).json({ error: 'Usuario o contraseñas incorrectos' });
    }

    const passwordEsValida = bcrypt.compareSync(password, config.adminPass);

    if (passwordEsValida) {
        const token = jwt.sign(
            { usuario },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        return res.json({
            mensaje: 'Login correcto',
            token
        });
    }

    return res.status(401).json({
        error: 'Usuario o contraseñas incorrectos'
    });
}
