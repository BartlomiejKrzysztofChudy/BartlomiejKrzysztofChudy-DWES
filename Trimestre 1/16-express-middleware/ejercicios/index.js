import express from 'express';
import morgan from 'morgan';
import winston from 'winston';

const app = express();
const PORT = 3000;

function errorHandler(err, req, res, next) {
    const status = err.statusCode < 500 ? err.statusCode : 500;

    if (status >= 500) {
        return res.status(500).json({ message: 'Server Error' });
    }

    res.status(status).json({
        code: status,
        message: err.message
    });
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write(message) {
        logger.info(message.trim());
    }
};

app.use(
    morgan('dev', {
        stream: logger.stream
    })
);

app.use((req, res, next) => {
    res.on('finish', () => {
        const code = res.statusCode;

        if (code >= 500) logger.error(`${req.method} ${req.url} → ${code}`);
        else if (code >= 400) logger.warn(`${req.method} ${req.url} → ${code}`);
        else logger.info(`${req.method} ${req.url} → ${code}`);
    });

    next();
});

function adminMiddleware(req, res, next) {
    const pass = req.headers.password;

    if (pass === 'patata') {
        return res.status(200).send('Bienvenido');
    }

    const err = new Error(
        'Acceso denegado, escriba "password"'
    );

    err.statusCode = 401;
    next(err);
}

app.get('/admin', adminMiddleware);

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
