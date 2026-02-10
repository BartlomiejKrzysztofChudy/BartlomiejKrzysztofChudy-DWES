import { Router } from "express";

import * as itemsController from "../../controllers/teacher/evaluation-items-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

router.get("/evaluations/:evaluationId/items", itemsController.getItemsByEvaluation);
router.post("/evaluations/:evaluationId/items", itemsController.createEvaluationItem);

export default router;
