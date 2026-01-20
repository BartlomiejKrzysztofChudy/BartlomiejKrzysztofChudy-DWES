import { Router } from 'express';

import * as ControladorPlaceholder from '../controllers/controlador-placeholder.js';

export const router = Router();


router.get('/posts', ControladorPlaceholder.posts);
router.get('/posts/:id', ControladorPlaceholder.postPorId);
router.put('/posts/:id', ControladorPlaceholder.actualizarPost);
