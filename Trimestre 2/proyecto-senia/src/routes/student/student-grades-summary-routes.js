import { Router } from "express";

import { getMyGradesSummary } from "../../controllers/student/student-grades-summary-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("STUDENT"));

router.get( "/evaluations/:evaluationId/grades/summary", getMyGradesSummary);

export default router;
