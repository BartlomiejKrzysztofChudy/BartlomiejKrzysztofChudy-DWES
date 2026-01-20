import express from 'express';

import { router as rutaLogin } from './routes/rutas-auth.js';
import { router as rutaPlaceholder } from './routes/rutas-placeholder.js';


const app = express();

app.use(express.json());

app.use('/api', rutaLogin);
app.use('/api/placeholder', rutaPlaceholder);


export { app };
export default app;
