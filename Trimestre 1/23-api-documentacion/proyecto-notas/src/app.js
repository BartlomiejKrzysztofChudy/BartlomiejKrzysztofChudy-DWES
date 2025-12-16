import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { getOpenApiSpec } from './openapi/index.js';
import { initFilesystem } from './loaders/index.js';
import { router as rutasNotas } from './routes/rutas-notas.js';
import { router as rutaLogin } from './routes/rutas-auth.js';

initFilesystem();

const app = express();

app.use(express.json());

app.use('/api', rutaLogin);
app.use('/api/notes', rutasNotas);


const openapiSpec = getOpenApiSpec();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

export { app };
export default app;
