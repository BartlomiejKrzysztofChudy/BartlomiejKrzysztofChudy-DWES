import { Router } from 'express';
import { getPong } from '../controllers/ping-controller.js';

const router = Router();

// Define route on root so mounting at '/ping' yields '/ping'
router.get('/', getPong);

export default router;