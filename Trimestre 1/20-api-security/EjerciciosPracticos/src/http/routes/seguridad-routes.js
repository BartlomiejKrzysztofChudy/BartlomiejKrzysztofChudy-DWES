import { Router } from "express";

import { accesoConcedido, vipZone, adminZone, publicZone } from "../../controllers/seguridad-controller.js";
import validateSecret from "../middleware/validateSecret.js";
import isAdmin from "../middleware/validateAdmin.js";
import isVip from "../middleware/validateVip.js";


const router = Router();


router.get('/secret', validateSecret, accesoConcedido);

router.get('/public',  publicZone);
router.get('/vip', validateSecret, isVip, vipZone);
router.get('/admin', validateSecret, isAdmin, adminZone);



export default router;