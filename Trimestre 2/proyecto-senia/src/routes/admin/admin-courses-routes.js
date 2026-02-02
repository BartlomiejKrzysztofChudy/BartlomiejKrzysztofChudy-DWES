import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";
import {
  createCourse,
  getCourses
} from "../../controllers/admin/admin-courses-controller.js";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createCourse);
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getCourses);

export default router;
