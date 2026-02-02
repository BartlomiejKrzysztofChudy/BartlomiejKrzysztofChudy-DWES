import { Router } from "express";

import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";
import {createSubject, getSubjectsByCourse} from "../../controllers/admin/admin-subjects-controller.js";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createSubject);
router.get("/course/:courseId", authMiddleware, roleMiddleware("ADMIN"),getSubjectsByCourse);

export default router;
