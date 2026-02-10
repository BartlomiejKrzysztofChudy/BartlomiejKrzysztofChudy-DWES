import { Router } from "express";
import { login } from "../controllers/auth-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import roleMiddleware from "../middlewares/role-middleware.js";

const router = Router();

router.post("/login", login);

router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.json({ message: "Solo ADMIN puede ver esto" });
  }
);

export default router;
