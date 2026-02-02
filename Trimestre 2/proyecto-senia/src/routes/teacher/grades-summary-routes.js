import { Router } from "express";

import { getGradesSummary } from "../../controllers/teacher/grades-summary-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

router.get( "/evaluations/:evaluationId/grades/summary", getGradesSummary);

export default router;
