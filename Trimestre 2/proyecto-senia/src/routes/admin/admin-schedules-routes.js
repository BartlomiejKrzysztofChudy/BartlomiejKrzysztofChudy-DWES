import { Router } from "express";
import { upsertSchedule, getSchedulesBySubject } from "../../controllers/admin/admin-schedules-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));

router.post("/subjects/:subjectId/schedule", upsertSchedule);
router.get("/subjects/:subjectId/schedule", getSchedulesBySubject);

export default router;
