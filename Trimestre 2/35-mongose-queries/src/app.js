import express from 'express';
import 'dotenv/config';

import { router as rutaLogin } from './routes/rutas-auth.js';
import { router as rutaPlaceholder } from './routes/rutas-placeholder.js';
import { router as rutaEmail } from './routes/rutas-email.js';
import mongoLoader from './loaders/mongodb-loader.js';
import { getCommentsByMovieAggregate } from './controllers/mflix.controller.js';
import './loaders/models-loader.js';
import { statsByStudentAndType,statsByClass } from './controllers/training.controller.js';



const app = express();

app.use(express.json());

app.use('/api', rutaLogin);
app.use('/api/placeholder', rutaPlaceholder);
app.use('/api/email', rutaEmail);

const start = async () => {
  await mongoLoader(process.env.MONGO_URI);
};

start();

export { app };
export default app;
