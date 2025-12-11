import {Router} from 'express'
import multer from 'multer'

import { uploadFiles, downloadFile } from '../controllers/files-Controller.js'

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'files/');
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const upload = multer ({ storage: storage})
router.post('/upload', upload.array('files'), uploadFiles);
router.get('/download/:filename', downloadFile);

export default router;