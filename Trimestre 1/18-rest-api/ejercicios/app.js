import express, { json } from 'express'
import useRoutes from './src/routes/user-routes.js';
import { errorHandler } from './src/middlewares/error-handler.js';

const app = express();
app.use(json());

app.use('/users', useRoutes);

app.use(errorHandler);
export default app;