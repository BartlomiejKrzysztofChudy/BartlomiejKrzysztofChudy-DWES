import { Router } from "express";

import { getMyProgress } from "../../controllers/student/student-dashboard-progress-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("STUDENT"));

router.get("/dashboard/progress", getMyProgress);

export default router;
