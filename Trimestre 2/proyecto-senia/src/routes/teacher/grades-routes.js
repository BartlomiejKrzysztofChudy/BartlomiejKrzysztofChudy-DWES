import { Router } from "express";

import * as gradesController from "../../controllers/teacher/grades-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

router.post( "/evaluations/items/:itemId/grades", gradesController.setGrade);
router.get( "/evaluations/items/:itemId/grades", gradesController.getGradesByItem);

export default router;
