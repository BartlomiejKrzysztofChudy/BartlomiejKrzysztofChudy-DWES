import { Router } from "express";

import authRoutes from "./auth-routes.js";
import adminUsersRoutes from "./admin/admin-users-routes.js";
import adminCoursesRoutes from "./admin/admin-courses-routes.js";
import adminSubjectsRoutes from "./admin/admin-subjects-routes.js";
import adminEnrollmentsRoutes from "./admin/admin-enrollments-routes.js";
import adminSchedulesRoutes from "./admin/admin-schedules-routes.js";
import teacherAttendanceRoutes from "./teacher/attendance-routes.js";
import studentAttendanceRoutes from "./student/student-attendance-routes.js";
import teacherEvaluationsRoutes from "./teacher/evaluations-routes.js";
import teacherEvaluationItemsRoutes from "./teacher/evaluation-items-routes.js";
import teacherGradesRoutes from "./teacher/grades-routes.js";
import teacherGradesSummaryRoutes from "./teacher/grades-summary-routes.js";
import studentGradesSummaryRoutes from "./student/student-grades-summary-routes.js";
import studentSubjectsRoutes from "./student/student-subjects-routes.js";
import studentDashboardRoutes from "./student/student-dashboard-routes.js";
import studentDashboardProgressRoutes from "./student/student-dashboard-progress-routes.js";
import studentAchievementsRoutes from "./student/student-achievements-routes.js";
import teacherDashboardRoutes from "./teacher/teacher-dashboard-routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin/users", adminUsersRoutes);
router.use("/admin/courses", adminCoursesRoutes);
router.use("/admin/subjects", adminSubjectsRoutes);
router.use("/admin/enrollments", adminEnrollmentsRoutes);
router.use("/admin", adminSchedulesRoutes);

router.use("/teacher", teacherAttendanceRoutes);
router.use("/teacher", teacherEvaluationsRoutes);
router.use("/teacher", teacherEvaluationItemsRoutes);
router.use("/teacher", teacherGradesRoutes);
router.use("/teacher", teacherGradesSummaryRoutes);
router.use("/teacher", teacherDashboardRoutes);

router.use("/student", studentAttendanceRoutes);
router.use("/student", studentGradesSummaryRoutes);
router.use("/student", studentSubjectsRoutes);
router.use("/student", studentDashboardRoutes);
router.use("/student", studentDashboardProgressRoutes);
router.use("/student", studentAchievementsRoutes);

export default router;
