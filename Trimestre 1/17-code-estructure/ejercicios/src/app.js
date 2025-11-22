import express from 'express';
import fibonacciRouter from './routes/routes-fibonacci.js';
import pingRouter from './routes/routes-ping.js';

const app = express();

app.use(express.json());
app.use('/fibonacci', fibonacciRouter);
app.use('/ping', pingRouter);

export default app;