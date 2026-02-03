import { Router } from "express";
import { getMyDashboard } from "../../controllers/student/student-dashboard-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("STUDENT"));

router.get("/dashboard", getMyDashboard);

export default router;
