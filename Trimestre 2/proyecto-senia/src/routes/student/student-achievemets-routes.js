import { Router } from "express";

import { getMyAchievements } from "../../controllers/student/student-achievements-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("STUDENT"));

router.get("/achievements", getMyAchievements);

export default router;
