import { Router } from "express";

import * as attendanceController from "../../controllers/teacher/attendance-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

router.get( "/subjects/:subjectId/attendance", attendanceController.getAttendanceBySubject);
router.post( "/subjects/:subjectId/attendance", attendanceController.markAttendance);
router.get( "/subjects/:subjectId/attendance/summary", attendanceController.getAttendanceSummary);

export default router;
