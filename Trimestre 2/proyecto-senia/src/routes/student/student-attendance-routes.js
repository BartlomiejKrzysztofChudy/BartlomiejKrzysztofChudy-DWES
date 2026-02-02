import { Router } from "express";

import * as attendanceController from "../../controllers/student/student-attendance-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("STUDENT"));

router.get("/attendance", attendanceController.getMyAttendance);

export default router;
