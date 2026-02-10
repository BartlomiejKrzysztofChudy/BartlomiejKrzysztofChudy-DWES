import { describe, it, expect, vi, beforeEach } from "vitest";

// Admin services
vi.mock("../../src/services/admin/admin-courses-service.js", () => ({
  createCourse: vi.fn(),
  getCourses: vi.fn()
}));
vi.mock("../../src/services/admin/admin-users-service.js", () => ({
  createUser: vi.fn(),
  getUsers: vi.fn()
}));
vi.mock("../../src/services/admin/admin-subjects-service.js", () => ({
  createSubject: vi.fn(),
  getSubjectsByCourse: vi.fn()
}));
vi.mock("../../src/services/admin/admin-enrollments-service.js", () => ({
  enrollStudent: vi.fn(),
  getEnrollmentsBySubject: vi.fn()
}));
vi.mock("../../src/services/admin/admin-schedules-service.js", () => ({
  upsertSchedule: vi.fn(),
  getSchedulesBySubject: vi.fn()
}));

// Teacher services
vi.mock("../../src/services/teacher/attendance-service.js", () => ({
  markAttendance: vi.fn(),
  getAttendanceBySubject: vi.fn(),
  getAttendanceSummary: vi.fn()
}));
vi.mock("../../src/services/teacher/evaluations-service.js", () => ({
  createEvaluation: vi.fn(),
  getEvaluationsBySubject: vi.fn()
}));
vi.mock("../../src/services/teacher/evaluation-items-service.js", () => ({
  createEvaluationItem: vi.fn(),
  getItemsByEvaluation: vi.fn()
}));
vi.mock("../../src/services/teacher/grades-service.js", () => ({
  setGrade: vi.fn(),
  getGradesByItem: vi.fn()
}));
vi.mock("../../src/services/teacher/grades-summary-service.js", () => ({
  getEvaluationGradesSummary: vi.fn()
}));
vi.mock("../../src/services/teacher/teacher-dashboard-service.js", () => ({
  getTeacherDashboard: vi.fn()
}));

// Student services
vi.mock("../../src/services/student/student-dashboard-service.js", () => ({
  getMyDashboard: vi.fn()
}));
vi.mock("../../src/services/student/student-dashboard-progress-service.js", () => ({
  getMyProgress: vi.fn()
}));
vi.mock("../../src/services/student/student-subjects-service.js", () => ({
  getMySubjects: vi.fn()
}));
vi.mock("../../src/services/student/student-subject-detail-service.js", () => ({
  getMySubjectDetail: vi.fn()
}));
vi.mock("../../src/services/student/student-attendance-service.js", () => ({
  getMyAttendance: vi.fn()
}));
vi.mock("../../src/services/student/grades-summary-service.js", () => ({
  getMyEvaluationGradesSummary: vi.fn()
}));
vi.mock("../../src/services/student/student-achievements-service.js", () => ({
  getMyAchievements: vi.fn()
}));

const adminCoursesService = await import("../../src/services/admin/admin-courses-service.js");
const adminUsersService = await import("../../src/services/admin/admin-users-service.js");
const adminSubjectsService = await import("../../src/services/admin/admin-subjects-service.js");
const adminEnrollmentsService = await import("../../src/services/admin/admin-enrollments-service.js");
const adminSchedulesService = await import("../../src/services/admin/admin-schedules-service.js");

const attendanceService = await import("../../src/services/teacher/attendance-service.js");
const evaluationsService = await import("../../src/services/teacher/evaluations-service.js");
const evaluationItemsService = await import("../../src/services/teacher/evaluation-items-service.js");
const gradesService = await import("../../src/services/teacher/grades-service.js");
const gradesSummaryService = await import("../../src/services/teacher/grades-summary-service.js");
const teacherDashboardService = await import("../../src/services/teacher/teacher-dashboard-service.js");

const studentDashboardService = await import("../../src/services/student/student-dashboard-service.js");
const studentDashboardProgressService = await import("../../src/services/student/student-dashboard-progress-service.js");
const studentSubjectsService = await import("../../src/services/student/student-subjects-service.js");
const studentSubjectDetailService = await import("../../src/services/student/student-subject-detail-service.js");
const studentAttendanceService = await import("../../src/services/student/student-attendance-service.js");
const studentGradesSummaryService = await import("../../src/services/student/grades-summary-service.js");
const studentAchievementsService = await import("../../src/services/student/student-achievements-service.js");

const adminCoursesController = await import("../../src/controllers/admin/admin-courses-controller.js");
const adminUsersController = await import("../../src/controllers/admin/admin-users-controller.js");
const adminSubjectsController = await import("../../src/controllers/admin/admin-subjects-controller.js");
const adminEnrollmentsController = await import("../../src/controllers/admin/admin-enrollments-controller.js");
const adminSchedulesController = await import("../../src/controllers/admin/admin-schedules-controller.js");

const attendanceController = await import("../../src/controllers/teacher/attendance-controller.js");
const evaluationsController = await import("../../src/controllers/teacher/evaluations-controller.js");
const evaluationItemsController = await import("../../src/controllers/teacher/evaluation-items-controller.js");
const gradesController = await import("../../src/controllers/teacher/grades-controller.js");
const gradesSummaryController = await import("../../src/controllers/teacher/grades-summary-controller.js");
const teacherDashboardController = await import("../../src/controllers/teacher/teacher-dashboard-controller.js");

const studentDashboardController = await import("../../src/controllers/student/student-dashboard-controller.js");
const studentDashboardProgressController = await import("../../src/controllers/student/student-dashboard-progress-controller.js");
const studentSubjectsController = await import("../../src/controllers/student/student-subjects-controller.js");
const studentSubjectDetailController = await import("../../src/controllers/student/student-subject-detail-controller.js");
const studentAttendanceController = await import("../../src/controllers/student/student-attendance-controller.js");
const studentGradesSummaryController = await import("../../src/controllers/student/student-grades-summary-controller.js");
const studentAchievementsController = await import("../../src/controllers/student/student-achievements-controller.js");

const makeRes = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn()
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("admin controllers", () => {
  it("createCourse returns 201", async () => {
    adminCoursesService.createCourse.mockResolvedValue({ id: "c1" });
    const req = { body: { name: "Course" } };
    const res = makeRes();
    const next = vi.fn();

    await adminCoursesController.createCourse(req, res, next);

    expect(adminCoursesService.createCourse).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "c1" });
  });

  it("createCourse calls next on error", async () => {
    const err = new Error("fail");
    adminCoursesService.createCourse.mockRejectedValue(err);
    const req = { body: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminCoursesController.createCourse(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getCourses returns list", async () => {
    adminCoursesService.getCourses.mockResolvedValue([{ id: "c1" }]);
    const req = {};
    const res = makeRes();
    const next = vi.fn();

    await adminCoursesController.getCourses(req, res, next);

    expect(adminCoursesService.getCourses).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ id: "c1" }]);
  });

  it("getCourses calls next on error", async () => {
    const err = new Error("fail");
    adminCoursesService.getCourses.mockRejectedValue(err);
    const req = {};
    const res = makeRes();
    const next = vi.fn();

    await adminCoursesController.getCourses(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("createUser returns 201", async () => {
    adminUsersService.createUser.mockResolvedValue({ id: "u1" });
    const req = { body: { name: "User" } };
    const res = makeRes();
    const next = vi.fn();

    await adminUsersController.createUser(req, res, next);

    expect(adminUsersService.createUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "u1" });
  });

  it("createUser calls next on error", async () => {
    const err = new Error("fail");
    adminUsersService.createUser.mockRejectedValue(err);
    const req = { body: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminUsersController.createUser(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getUsers returns list", async () => {
    adminUsersService.getUsers.mockResolvedValue([{ id: "u1" }]);
    const req = { query: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminUsersController.getUsers(req, res, next);

    expect(adminUsersService.getUsers).toHaveBeenCalledWith();
    expect(res.json).toHaveBeenCalledWith([{ id: "u1" }]);
  });

  it("getUsers calls next on error", async () => {
    const err = new Error("fail");
    adminUsersService.getUsers.mockRejectedValue(err);
    const req = { query: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminUsersController.getUsers(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("createSubject returns 201", async () => {
    adminSubjectsService.createSubject.mockResolvedValue({ id: "s1" });
    const req = { body: { name: "Subject" } };
    const res = makeRes();
    const next = vi.fn();

    await adminSubjectsController.createSubject(req, res, next);

    expect(adminSubjectsService.createSubject).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "s1" });
  });

  it("createSubject calls next on error", async () => {
    const err = new Error("fail");
    adminSubjectsService.createSubject.mockRejectedValue(err);
    const req = { body: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminSubjectsController.createSubject(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getSubjectsByCourse returns list", async () => {
    adminSubjectsService.getSubjectsByCourse.mockResolvedValue([{ id: "s1" }]);
    const req = { params: { courseId: "c1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminSubjectsController.getSubjectsByCourse(req, res, next);

    expect(adminSubjectsService.getSubjectsByCourse).toHaveBeenCalledWith("c1");
    expect(res.json).toHaveBeenCalledWith([{ id: "s1" }]);
  });

  it("getSubjectsByCourse calls next on error", async () => {
    const err = new Error("fail");
    adminSubjectsService.getSubjectsByCourse.mockRejectedValue(err);
    const req = { params: { courseId: "c1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminSubjectsController.getSubjectsByCourse(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("enrollStudent returns 201", async () => {
    adminEnrollmentsService.enrollStudent.mockResolvedValue({ id: "e1" });
    const req = { body: { student: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminEnrollmentsController.enrollStudent(req, res, next);

    expect(adminEnrollmentsService.enrollStudent).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "e1" });
  });

  it("enrollStudent calls next on error", async () => {
    const err = new Error("fail");
    adminEnrollmentsService.enrollStudent.mockRejectedValue(err);
    const req = { body: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminEnrollmentsController.enrollStudent(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getEnrollmentsBySubject returns list", async () => {
    adminEnrollmentsService.getEnrollmentsBySubject.mockResolvedValue([{ id: "e1" }]);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminEnrollmentsController.getEnrollmentsBySubject(req, res, next);

    expect(adminEnrollmentsService.getEnrollmentsBySubject).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith([{ id: "e1" }]);
  });

  it("getEnrollmentsBySubject calls next on error", async () => {
    const err = new Error("fail");
    adminEnrollmentsService.getEnrollmentsBySubject.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminEnrollmentsController.getEnrollmentsBySubject(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("upsertSchedule returns 201", async () => {
    adminSchedulesService.upsertSchedule.mockResolvedValue({ id: "sch1" });
    const req = { params: { subjectId: "s1" }, body: { dayOfWeek: 1 } };
    const res = makeRes();
    const next = vi.fn();

    await adminSchedulesController.upsertSchedule(req, res, next);

    expect(adminSchedulesService.upsertSchedule).toHaveBeenCalledWith("s1", req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "sch1" });
  });

  it("upsertSchedule calls next on error", async () => {
    const err = new Error("fail");
    adminSchedulesService.upsertSchedule.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" }, body: {} };
    const res = makeRes();
    const next = vi.fn();

    await adminSchedulesController.upsertSchedule(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getSchedulesBySubject returns list", async () => {
    adminSchedulesService.getSchedulesBySubject.mockResolvedValue([{ id: "sch1" }]);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminSchedulesController.getSchedulesBySubject(req, res, next);

    expect(adminSchedulesService.getSchedulesBySubject).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith([{ id: "sch1" }]);
  });

  it("getSchedulesBySubject calls next on error", async () => {
    const err = new Error("fail");
    adminSchedulesService.getSchedulesBySubject.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await adminSchedulesController.getSchedulesBySubject(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

describe("teacher controllers", () => {
  it("markAttendance returns 201", async () => {
    attendanceService.markAttendance.mockResolvedValue([{ id: "a1" }]);
    const req = {
      params: { subjectId: "s1" },
      body: { date: "2026-02-10", attendances: [] },
      user: { id: "t1" }
    };
    const res = makeRes();
    const next = vi.fn();

    await attendanceController.markAttendance(req, res, next);

    expect(attendanceService.markAttendance).toHaveBeenCalledWith({
      teacherId: "t1",
      subjectId: "s1",
      date: "2026-02-10",
      attendances: []
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith([{ id: "a1" }]);
  });

  it("markAttendance calls next on error", async () => {
    const err = new Error("fail");
    attendanceService.markAttendance.mockRejectedValue(err);
    const req = {
      params: { subjectId: "s1" },
      body: { date: "2026-02-10", attendances: [] },
      user: { id: "t1" }
    };
    const res = makeRes();
    const next = vi.fn();

    await attendanceController.markAttendance(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getAttendanceBySubject returns list", async () => {
    attendanceService.getAttendanceBySubject.mockResolvedValue([{ id: "a1" }]);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await attendanceController.getAttendanceBySubject(req, res, next);

    expect(attendanceService.getAttendanceBySubject).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith([{ id: "a1" }]);
  });

  it("getAttendanceBySubject calls next on error", async () => {
    const err = new Error("fail");
    attendanceService.getAttendanceBySubject.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await attendanceController.getAttendanceBySubject(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getAttendanceSummary returns summary", async () => {
    attendanceService.getAttendanceSummary.mockResolvedValue({ total: 1 });
    const req = { params: { subjectId: "s1" }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await attendanceController.getAttendanceSummary(req, res, next);

    expect(attendanceService.getAttendanceSummary).toHaveBeenCalledWith({
      teacherId: "t1",
      subjectId: "s1"
    });
    expect(res.json).toHaveBeenCalledWith({ total: 1 });
  });

  it("getAttendanceSummary calls next on error", async () => {
    const err = new Error("fail");
    attendanceService.getAttendanceSummary.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await attendanceController.getAttendanceSummary(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("createEvaluation returns 201", async () => {
    evaluationsService.createEvaluation.mockResolvedValue({ id: "ev1" });
    const req = { params: { subjectId: "s1" }, body: { name: "Eval" }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationsController.createEvaluation(req, res, next);

    expect(evaluationsService.createEvaluation).toHaveBeenCalledWith({
      teacherId: "t1",
      subjectId: "s1",
      name: "Eval",
      order: undefined
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "ev1" });
  });

  it("createEvaluation calls next on error", async () => {
    const err = new Error("fail");
    evaluationsService.createEvaluation.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" }, body: {}, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationsController.createEvaluation(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getEvaluationsBySubject returns list", async () => {
    evaluationsService.getEvaluationsBySubject.mockResolvedValue([{ id: "ev1" }]);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationsController.getEvaluationsBySubject(req, res, next);

    expect(evaluationsService.getEvaluationsBySubject).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith([{ id: "ev1" }]);
  });

  it("getEvaluationsBySubject calls next on error", async () => {
    const err = new Error("fail");
    evaluationsService.getEvaluationsBySubject.mockRejectedValue(err);
    const req = { params: { subjectId: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationsController.getEvaluationsBySubject(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("createEvaluationItem returns 201", async () => {
    evaluationItemsService.createEvaluationItem.mockResolvedValue({ id: "i1" });
    const req = { params: { evaluationId: "e1" }, body: { name: "Item" }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationItemsController.createEvaluationItem(req, res, next);

    expect(evaluationItemsService.createEvaluationItem).toHaveBeenCalledWith({
      teacherId: "t1",
      evaluationId: "e1",
      name: "Item",
      type: undefined,
      weight: undefined
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "i1" });
  });

  it("createEvaluationItem calls next on error", async () => {
    const err = new Error("fail");
    evaluationItemsService.createEvaluationItem.mockRejectedValue(err);
    const req = { params: { evaluationId: "e1" }, body: {}, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationItemsController.createEvaluationItem(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getItemsByEvaluation returns list", async () => {
    evaluationItemsService.getItemsByEvaluation.mockResolvedValue([{ id: "i1" }]);
    const req = { params: { evaluationId: "e1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationItemsController.getItemsByEvaluation(req, res, next);

    expect(evaluationItemsService.getItemsByEvaluation).toHaveBeenCalledWith("e1");
    expect(res.json).toHaveBeenCalledWith([{ id: "i1" }]);
  });

  it("getItemsByEvaluation calls next on error", async () => {
    const err = new Error("fail");
    evaluationItemsService.getItemsByEvaluation.mockRejectedValue(err);
    const req = { params: { evaluationId: "e1" } };
    const res = makeRes();
    const next = vi.fn();

    await evaluationItemsController.getItemsByEvaluation(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("setGrade returns 201", async () => {
    gradesService.setGrade.mockResolvedValue({ id: "g1" });
    const req = { params: { itemId: "i1" }, body: { studentId: "s1", value: 7 }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await gradesController.setGrade(req, res, next);

    expect(gradesService.setGrade).toHaveBeenCalledWith({
      teacherId: "t1",
      itemId: "i1",
      studentId: "s1",
      value: 7
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "g1" });
  });

  it("setGrade calls next on error", async () => {
    const err = new Error("fail");
    gradesService.setGrade.mockRejectedValue(err);
    const req = { params: { itemId: "i1" }, body: { studentId: "s1", value: 7 }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await gradesController.setGrade(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getGradesByItem returns list", async () => {
    gradesService.getGradesByItem.mockResolvedValue([{ id: "g1" }]);
    const req = { params: { itemId: "i1" } };
    const res = makeRes();
    const next = vi.fn();

    await gradesController.getGradesByItem(req, res, next);

    expect(gradesService.getGradesByItem).toHaveBeenCalledWith("i1");
    expect(res.json).toHaveBeenCalledWith([{ id: "g1" }]);
  });

  it("getGradesByItem calls next on error", async () => {
    const err = new Error("fail");
    gradesService.getGradesByItem.mockRejectedValue(err);
    const req = { params: { itemId: "i1" } };
    const res = makeRes();
    const next = vi.fn();

    await gradesController.getGradesByItem(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getGradesSummary returns summary", async () => {
    gradesSummaryService.getEvaluationGradesSummary.mockResolvedValue({ total: 1 });
    const req = { params: { evaluationId: "e1" }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await gradesSummaryController.getGradesSummary(req, res, next);

    expect(gradesSummaryService.getEvaluationGradesSummary).toHaveBeenCalledWith({
      teacherId: "t1",
      evaluationId: "e1"
    });
    expect(res.json).toHaveBeenCalledWith({ total: 1 });
  });

  it("getGradesSummary calls next on error", async () => {
    const err = new Error("fail");
    gradesSummaryService.getEvaluationGradesSummary.mockRejectedValue(err);
    const req = { params: { evaluationId: "e1" }, user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await gradesSummaryController.getGradesSummary(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getTeacherDashboard returns data", async () => {
    teacherDashboardService.getTeacherDashboard.mockResolvedValue({ total: 1 });
    const req = { user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await teacherDashboardController.getTeacherDashboard(req, res, next);

    expect(teacherDashboardService.getTeacherDashboard).toHaveBeenCalledWith("t1");
    expect(res.json).toHaveBeenCalledWith({ total: 1 });
  });

  it("getTeacherDashboard calls next on error", async () => {
    const err = new Error("fail");
    teacherDashboardService.getTeacherDashboard.mockRejectedValue(err);
    const req = { user: { id: "t1" } };
    const res = makeRes();
    const next = vi.fn();

    await teacherDashboardController.getTeacherDashboard(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

describe("student controllers", () => {
  it("getMyDashboard returns data", async () => {
    studentDashboardService.getMyDashboard.mockResolvedValue({ total: 1 });
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentDashboardController.getMyDashboard(req, res, next);

    expect(studentDashboardService.getMyDashboard).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith({ total: 1 });
  });

  it("getMyDashboard calls next on error", async () => {
    const err = new Error("fail");
    studentDashboardService.getMyDashboard.mockRejectedValue(err);
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentDashboardController.getMyDashboard(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getMyProgress returns data", async () => {
    studentDashboardProgressService.getMyProgress.mockResolvedValue({ level: 1 });
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentDashboardProgressController.getMyProgress(req, res, next);

    expect(studentDashboardProgressService.getMyProgress).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith({ level: 1 });
  });

  it("getMyProgress calls next on error", async () => {
    const err = new Error("fail");
    studentDashboardProgressService.getMyProgress.mockRejectedValue(err);
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentDashboardProgressController.getMyProgress(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getMySubjects returns data", async () => {
    studentSubjectsService.getMySubjects.mockResolvedValue([{ id: "s1" }]);
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentSubjectsController.getMySubjects(req, res, next);

    expect(studentSubjectsService.getMySubjects).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith([{ id: "s1" }]);
  });

  it("getMySubjects calls next on error", async () => {
    const err = new Error("fail");
    studentSubjectsService.getMySubjects.mockRejectedValue(err);
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentSubjectsController.getMySubjects(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getMySubjectDetail returns data", async () => {
    studentSubjectDetailService.getMySubjectDetail.mockResolvedValue({ id: "d1" });
    const req = { user: { id: "s1" }, params: { subjectId: "sub1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentSubjectDetailController.getMySubjectDetail(req, res, next);

    expect(studentSubjectDetailService.getMySubjectDetail).toHaveBeenCalledWith("s1", "sub1");
    expect(res.json).toHaveBeenCalledWith({ id: "d1" });
  });

  it("getMySubjectDetail calls next on error", async () => {
    const err = new Error("fail");
    studentSubjectDetailService.getMySubjectDetail.mockRejectedValue(err);
    const req = { user: { id: "s1" }, params: { subjectId: "sub1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentSubjectDetailController.getMySubjectDetail(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getMyAttendance returns data", async () => {
    studentAttendanceService.getMyAttendance.mockResolvedValue([{ id: "a1" }]);
    const req = { user: { id: "s1" }, query: {} };
    const res = makeRes();
    const next = vi.fn();

    await studentAttendanceController.getMyAttendance(req, res, next);

    expect(studentAttendanceService.getMyAttendance).toHaveBeenCalledWith("s1", req.query);
    expect(res.json).toHaveBeenCalledWith([{ id: "a1" }]);
  });

  it("getMyAttendance calls next on error", async () => {
    const err = new Error("fail");
    studentAttendanceService.getMyAttendance.mockRejectedValue(err);
    const req = { user: { id: "s1" }, query: {} };
    const res = makeRes();
    const next = vi.fn();

    await studentAttendanceController.getMyAttendance(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getMyGradesSummary returns data", async () => {
    studentGradesSummaryService.getMyEvaluationGradesSummary.mockResolvedValue({ total: 1 });
    const req = { user: { id: "s1" }, params: { evaluationId: "e1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentGradesSummaryController.getMyGradesSummary(req, res, next);

    expect(studentGradesSummaryService.getMyEvaluationGradesSummary).toHaveBeenCalledWith({
      studentId: "s1",
      evaluationId: "e1"
    });
    expect(res.json).toHaveBeenCalledWith({ total: 1 });
  });

  it("getMyGradesSummary calls next on error", async () => {
    const err = new Error("fail");
    studentGradesSummaryService.getMyEvaluationGradesSummary.mockRejectedValue(err);
    const req = { user: { id: "s1" }, params: { evaluationId: "e1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentGradesSummaryController.getMyGradesSummary(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("getMyAchievements returns data", async () => {
    studentAchievementsService.getMyAchievements.mockResolvedValue([{ id: "a1" }]);
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentAchievementsController.getMyAchievements(req, res, next);

    expect(studentAchievementsService.getMyAchievements).toHaveBeenCalledWith("s1");
    expect(res.json).toHaveBeenCalledWith([{ id: "a1" }]);
  });

  it("getMyAchievements calls next on error", async () => {
    const err = new Error("fail");
    studentAchievementsService.getMyAchievements.mockRejectedValue(err);
    const req = { user: { id: "s1" } };
    const res = makeRes();
    const next = vi.fn();

    await studentAchievementsController.getMyAchievements(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});
