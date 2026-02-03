import { Router } from "express";

import { getTeacherDashboard } from "../../controllers/teacher/teacher-dashboard-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

router.get("/dashboard", getTeacherDashboard);

export default router;
