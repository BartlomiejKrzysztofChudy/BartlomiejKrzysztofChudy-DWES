import { Router } from "express";

import { getMySubjects } from "../../controllers/student/student-subjects-controller.js";
import { getMySubjectDetail} from "../../controllers/student/student-subject-detail-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import roleMiddleware from "../../middlewares/role-middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("STUDENT"));

router.get("/subjects", getMySubjects);
router.get("/subjects/:subjectId", getMySubjectDetail);

export default router;
