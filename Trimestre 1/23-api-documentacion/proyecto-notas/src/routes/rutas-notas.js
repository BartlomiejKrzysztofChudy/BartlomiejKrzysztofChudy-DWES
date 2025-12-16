import { Router } from 'express';

import * as Controlador from '../controllers/controlador-api.js';
import { verificarToken } from '../middlewares/auth-middleware.js';
import { upload } from '../middlewares/upload-middleware.js';

export const router = Router();

router.use(verificarToken);

router.post('/import', upload.array('notas', 10), (req, res) => {
    res.json({ mensaje: 'Archivos subidos correctamente' });
});

router.get('/:name/download', Controlador.downloadNote);
router.get('/', Controlador.getNotes);
router.post('/', Controlador.createNote);
router.get('/:name', Controlador.getNote);
router.put('/', Controlador.updateNote);
router.delete('/:name', Controlador.deleteNote);
