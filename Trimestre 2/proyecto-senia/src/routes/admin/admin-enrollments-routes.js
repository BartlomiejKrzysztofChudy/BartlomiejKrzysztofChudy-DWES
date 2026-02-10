import { Router } from "express";

import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";
import { enrollStudent, getEnrollmentsBySubject } from "../../controllers/admin/admin-enrollments-controller.js";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), enrollStudent);
router.get("/subject/:subjectId", authMiddleware, roleMiddleware("ADMIN"), getEnrollmentsBySubject);

export default router;
