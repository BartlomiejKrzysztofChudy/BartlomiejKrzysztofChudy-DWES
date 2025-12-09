import express from 'express';
import { notesRouter } from './http/routes/notes-routes.js';
import { logger } from './utils/logger.js';
import { errorHandler } from './http/middleware/error-handler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api/notes', notesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server escuchando ${PORT}`);
  });
}

export default app;
