import express from "express";
import setupSwagger from "./openapi/index.js";

import authRoutes from "./routes/auth-routes.js";
import adminUsersRoutes from "./routes/admin/admin-users-routes.js";
import adminCoursesRoutes from "./routes/admin/admin-courses-routes.js";
import adminSubjectsRoutes from "./routes/admin/admin-subjects-routes.js";
import adminEnrollmentsRoutes from "./routes/admin/admin-enrollments-routes.js";
import teacherAttendanceRoutes from "./routes/teacher/attendance-routes.js";
import studentAttendanceRoutes from "./routes/student/student-attendance-routes.js";
import teacherEvaluationsRoutes from "./routes/teacher/evaluations-routes.js";
import teacherEvaluationItemsRoutes from "./routes/teacher/evaluation-items-routes.js";
import teacherGradesRoutes from "./routes/teacher/grades-routes.js";
import teacherGradesSummaryRoutes from "./routes/teacher/grades-summary-routes.js";
import studentGradesSummaryRoutes from "./routes/student/student-grades-summary-routes.js";


const app = express();

app.use(express.json());

setupSwagger(app);

app.use("/auth", authRoutes);

app.use("/admin/users", adminUsersRoutes);
app.use("/admin/courses", adminCoursesRoutes);
app.use("/admin/subjects", adminSubjectsRoutes)
app.use("/admin/enrollments", adminEnrollmentsRoutes);

app.use("/teacher", teacherAttendanceRoutes);
app.use("/teacher", teacherEvaluationsRoutes);
app.use("/teacher", teacherEvaluationItemsRoutes);
app.use("/teacher", teacherGradesRoutes);
app.use("/teacher", teacherGradesSummaryRoutes);

app.use("/student", studentAttendanceRoutes);
app.use("/student", studentGradesSummaryRoutes);

export default app;
