import { Router } from 'express';

import * as ControladorAuth from '../controllers/controlador-auth.js';

export const router = Router();

router.post('/login', ControladorAuth.login);
