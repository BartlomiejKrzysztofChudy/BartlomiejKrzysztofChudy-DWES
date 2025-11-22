import { Router } from 'express';
import fibonacciRouter from './routes-fibonacci.js';
import pingRouter from './routes-ping.js';

const router = Router();

router.use('/fibonacci', fibonacciRouter); 
router.use('/ping', pingRouter);          

export default router;