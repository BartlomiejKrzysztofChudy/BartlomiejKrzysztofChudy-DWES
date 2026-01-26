import { Router } from 'express';
import * as ControladorEmail from '../controllers/controlador-email.js';

export const router = Router();

router.post('/send', ControladorEmail.enviar);
