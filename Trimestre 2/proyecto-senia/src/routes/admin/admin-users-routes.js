import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";
import { createUser, getUsers } from "../../controllers/admin/admin-users-controller.js";

const router = Router();

router.post( "/", authMiddleware, roleMiddleware("ADMIN"), createUser);

router.get( "/",authMiddleware, roleMiddleware("ADMIN"), getUsers);

export default router;
