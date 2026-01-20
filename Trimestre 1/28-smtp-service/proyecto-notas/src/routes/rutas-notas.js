import { Router } from 'express';

import { verificarToken } from '../middlewares/auth-middleware.js';

export const router = Router();

router.use(verificarToken);


