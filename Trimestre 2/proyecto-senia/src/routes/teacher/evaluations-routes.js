import { Router } from "express";

import * as evaluationsController from "../../controllers/teacher/evaluations-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

router.get("/subjects/:subjectId/evaluations", evaluationsController.getEvaluationsBySubject);
router.post("/subjects/:subjectId/evaluations", evaluationsController.createEvaluation);

export default router;
