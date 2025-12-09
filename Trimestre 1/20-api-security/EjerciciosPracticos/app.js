import express from 'express';

import seguridadRoutes from './src/http/routes/seguridad-routes.js'

const app = express();

app.use(express.json()); 
app.use('/', seguridadRoutes);

export default app;