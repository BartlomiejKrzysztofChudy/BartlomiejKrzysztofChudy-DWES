
import express from 'express';
import { configureRoutes } from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureRoutes(app);

export default app;