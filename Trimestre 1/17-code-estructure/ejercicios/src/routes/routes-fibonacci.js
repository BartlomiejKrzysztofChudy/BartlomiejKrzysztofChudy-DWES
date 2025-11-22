import { Router } from 'express';
import { getFibonacci } from '../controllers/fibonacci-controller.js';

const router = Router();

router.get('/', getFibonacci); 

export default router;