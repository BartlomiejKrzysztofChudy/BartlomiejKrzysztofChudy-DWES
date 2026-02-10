import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/models/attendance-model.js", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/enrollment-model.js", () => ({
  default: {
    findOne: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/subject-model.js", () => ({
  default: {
    findById: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/user-model.js", () => ({
  default: {
    findById: vi.fn()
  }
}));

vi.mock("../../src/models/evaluation-model.js", () => ({
  default: {
    findById: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/evaluation-item-model.js", () => ({
  default: {
    findById: vi.fn(),
    find: vi.fn(),
    create: vi.fn()
  }
}));

vi.mock("../../src/models/grade-model.js", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn()
  }
}));

vi.mock("../../src/models/schedule-model.js", () => ({
  default: {
    findOne: vi.fn()
  }
}));

const { default: Attendance } = await import(
  "../../src/models/attendance-model.js"
);
const { default: Enrollment } = await import(
  "../../src/models/enrollment-model.js"
);
const { default: Subject } = await import("../../src/models/subject-model.js");
const { default: User } = await import("../../src/models/user-model.js");
const { default: Evaluation } = await import(
  "../../src/models/evaluation-model.js"
);
const { default: EvaluationItem } = await import(
  "../../src/models/evaluation-item-model.js"
);
const { default: Grade } = await import("../../src/models/grade-model.js");
const { default: Schedule } = await import(
  "../../src/models/schedule-model.js"
);

const {
  markAttendance,
  getAttendanceBySubject,
  getAttendanceSummary
} = await import("../../src/services/teacher/attendance-service.js");

const {
  createEvaluation,
  getEvaluationsBySubject
} = await import("../../src/services/teacher/evaluations-service.js");

const {
  createEvaluationItem,
  getItemsByEvaluation
} = await import("../../src/services/teacher/evaluation-items-service.js");

const { setGrade } = await import(
  "../../src/services/teacher/grades-service.js"
);
const { getGradesByItem } = await import(
  "../../src/services/teacher/grades-service.js"
);

const { getEvaluationGradesSummary } = await import(
  "../../src/services/teacher/grades-summary-service.js"
);

const { getTeacherDashboard } = await import(
  "../../src/services/teacher/teacher-dashboard-service.js"
);

beforeEach(() => {
  vi.clearAllMocks();
});

const makeSortQuery = (result) => ({
  sort: vi.fn().mockResolvedValue(result),
  populate: vi.fn().mockReturnThis()
});

describe("teacher attendance service", () => {
  it("marks attendance for enrolled students", async () => {
    User.findById.mockResolvedValue({ _id: "t1", role: "TEACHER" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Enrollment.findOne.mockResolvedValue({ _id: "en1" });
    Attendance.findOneAndUpdate.mockResolvedValue({ _id: "a1" });

    const result = await markAttendance({
      teacherId: "t1",
      subjectId: "sub1",
      date: "2026-02-01",
      attendances: [{ studentId: "s1", status: "PRESENT" }]
    });

    expect(result).toEqual([{ _id: "a1" }]);
  });

  it("rejects when subject not found", async () => {
    User.findById.mockResolvedValue({ _id: "t1", role: "TEACHER" });
    Subject.findById.mockResolvedValue(null);

    await expect(
      markAttendance({ teacherId: "t1", subjectId: "sub1", date: "2026-02-01", attendances: [] })
    ).rejects.toThrow("Asignatura no encontrada");
  });

  it("rejects when teacher is not subject owner", async () => {
    User.findById.mockResolvedValue({ _id: "t1", role: "TEACHER" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t2" }
    });

    await expect(
      markAttendance({ teacherId: "t1", subjectId: "sub1", date: "2026-02-01", attendances: [] })
    ).rejects.toThrow("No eres el profesor");
  });

  it("rejects unauthorized teacher", async () => {
    User.findById.mockResolvedValue({ _id: "t1", role: "STUDENT" });

    await expect(
      markAttendance({ teacherId: "t1", subjectId: "sub1", date: "2026-02-01", attendances: [] })
    ).rejects.toThrow("Usuario no autorizado");
  });

  it("rejects when student not enrolled", async () => {
    User.findById.mockResolvedValue({ _id: "t1", role: "TEACHER" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Enrollment.findOne.mockResolvedValue(null);

    await expect(
      markAttendance({
        teacherId: "t1",
        subjectId: "sub1",
        date: "2026-02-01",
        attendances: [{ studentId: "s1", status: "PRESENT" }]
      })
    ).rejects.toThrow("Alumno no matriculado");
  });

  it("getAttendanceBySubject populates and sorts", async () => {
    const query = { populate: vi.fn().mockReturnThis(), sort: vi.fn().mockResolvedValue([{ id: 1 }]) };
    Attendance.find.mockReturnValue(query);

    const result = await getAttendanceBySubject("sub1");

    expect(query.populate).toHaveBeenCalledWith("student", "name email");
    expect(query.sort).toHaveBeenCalledWith({ date: 1 });
    expect(result).toEqual([{ id: 1 }]);
  });

  it("computes attendance summary", async () => {
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Attendance.find.mockResolvedValue([
      { status: "PRESENT" },
      { status: "LATE" },
      { status: "ABSENT" }
    ]);

    const result = await getAttendanceSummary({ teacherId: "t1", subjectId: "sub1" });

    expect(result).toEqual({
      total: 3,
      present: 1,
      absent: 1,
      late: 1,
      attendanceRate: 33
    });
  });

  it("summary rejects when subject not found", async () => {
    Subject.findById.mockResolvedValue(null);

    await expect(
      getAttendanceSummary({ teacherId: "t1", subjectId: "sub1" })
    ).rejects.toThrow("Asignatura no encontrada");
  });

  it("summary rejects when not authorized", async () => {
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t2" }
    });

    await expect(
      getAttendanceSummary({ teacherId: "t1", subjectId: "sub1" })
    ).rejects.toThrow("No autorizado");
  });

  it("summary returns 0 rate when no attendance", async () => {
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Attendance.find.mockResolvedValue([]);

    const result = await getAttendanceSummary({ teacherId: "t1", subjectId: "sub1" });

    expect(result.attendanceRate).toBe(0);
  });
});

describe("teacher evaluations service", () => {
  it("rejects when subject not found", async () => {
    Subject.findById.mockResolvedValue(null);

    await expect(
      createEvaluation({ teacherId: "t1", subjectId: "sub1", name: "Eval", order: 1 })
    ).rejects.toThrow("Asignatura no encontrada");
  });

  it("rejects when not authorized", async () => {
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t2" }
    });

    await expect(
      createEvaluation({ teacherId: "t1", subjectId: "sub1", name: "Eval", order: 1 })
    ).rejects.toThrow("No autorizado");
  });

  it("creates evaluation when authorized", async () => {
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Evaluation.create.mockResolvedValue({ _id: "e1" });

    const result = await createEvaluation({
      teacherId: "t1",
      subjectId: "sub1",
      name: "Eval",
      order: 1
    });

    expect(result).toEqual({ _id: "e1" });
  });

  it("getEvaluationsBySubject sorts by order", async () => {
    const query = makeSortQuery([{ id: 1 }]);
    Evaluation.find.mockReturnValue(query);

    const result = await getEvaluationsBySubject("sub1");

    expect(result).toEqual([{ id: 1 }]);
    expect(query.sort).toHaveBeenCalledWith({ order: 1 });
  });
});

describe("teacher evaluation items service", () => {
  it("rejects when evaluation not found", async () => {
    Evaluation.findById.mockResolvedValue(null);

    await expect(
      createEvaluationItem({
        teacherId: "t1",
        evaluationId: "e1",
        name: "Exam",
        type: "EXAM",
        weight: 60
      })
    ).rejects.toThrow("Evaluaci");
  });

  it("rejects when teacher not authorized", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t2" }
    });

    await expect(
      createEvaluationItem({
        teacherId: "t1",
        evaluationId: "e1",
        name: "Exam",
        type: "EXAM",
        weight: 60
      })
    ).rejects.toThrow("No autorizado");
  });

  it("creates item when authorized", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    EvaluationItem.create.mockResolvedValue({ _id: "i1" });

    const result = await createEvaluationItem({
      teacherId: "t1",
      evaluationId: "e1",
      name: "Exam",
      type: "EXAM",
      weight: 60
    });

    expect(result).toEqual({ _id: "i1" });
  });

  it("getItemsByEvaluation sorts by createdAt", async () => {
    const query = makeSortQuery([{ id: 1 }]);
    EvaluationItem.find.mockReturnValue(query);

    const result = await getItemsByEvaluation("e1");

    expect(result).toEqual([{ id: 1 }]);
    expect(query.sort).toHaveBeenCalledWith({ createdAt: 1 });
  });
});

describe("teacher grades service", () => {
  it("sets grade when authorized and enrolled", async () => {
    EvaluationItem.findById.mockResolvedValue({ _id: "i1", evaluation: "e1" });
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Enrollment.findOne.mockResolvedValue({ _id: "en1" });
    Grade.findOneAndUpdate.mockResolvedValue({ _id: "g1", value: 8 });

    const result = await setGrade({
      teacherId: "t1",
      itemId: "i1",
      studentId: "s1",
      value: 8
    });

    expect(result).toEqual({ _id: "g1", value: 8 });
  });

  it("rejects when not authorized for subject", async () => {
    EvaluationItem.findById.mockResolvedValue({ _id: "i1", evaluation: "e1" });
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t2" }
    });

    await expect(
      setGrade({ teacherId: "t1", itemId: "i1", studentId: "s1", value: 8 })
    ).rejects.toThrow("No autorizado");
  });

  it("rejects when student not enrolled", async () => {
    EvaluationItem.findById.mockResolvedValue({ _id: "i1", evaluation: "e1" });
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    Enrollment.findOne.mockResolvedValue(null);

    await expect(
      setGrade({ teacherId: "t1", itemId: "i1", studentId: "s1", value: 8 })
    ).rejects.toThrow("Alumno no matriculado");
  });

  it("rejects when item not found", async () => {
    EvaluationItem.findById.mockResolvedValue(null);

    await expect(
      setGrade({ teacherId: "t1", itemId: "i1", studentId: "s1", value: 8 })
    ).rejects.toThrow(/tem evaluable/i);
  });

  it("getGradesByItem populates and sorts", async () => {
    const query = { populate: vi.fn().mockReturnThis(), sort: vi.fn().mockResolvedValue([{ id: 1 }]) };
    Grade.find.mockReturnValue(query);

    const result = await getGradesByItem("i1");

    expect(query.populate).toHaveBeenCalledWith("student", "name email");
    expect(query.sort).toHaveBeenCalledWith({ createdAt: 1 });
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe("teacher grades summary service", () => {
  it("rejects when evaluation not found", async () => {
    Evaluation.findById.mockResolvedValue(null);

    await expect(
      getEvaluationGradesSummary({ teacherId: "t1", evaluationId: "e1" })
    ).rejects.toThrow("Evaluaci");
  });

  it("rejects when not authorized for evaluation", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t2" }
    });

    await expect(
      getEvaluationGradesSummary({ teacherId: "t1", evaluationId: "e1" })
    ).rejects.toThrow("No autorizado");
  });

  it("builds summary with averages", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Subject.findById.mockResolvedValue({
      _id: "sub1",
      teacher: { toString: () => "t1" }
    });
    EvaluationItem.find.mockResolvedValue([
      { _id: "i1", name: "Exam", weight: 50 },
      { _id: "i2", name: "Project", weight: 50 }
    ]);
    Grade.find
      .mockResolvedValueOnce([{ value: 8 }, { value: 6 }])
      .mockResolvedValueOnce([{ value: 10 }]);

    const result = await getEvaluationGradesSummary({
      teacherId: "t1",
      evaluationId: "e1"
    });

    expect(result.finalGrade).toBe(8.5);
    expect(result.items).toHaveLength(2);
  });
});

describe("teacher dashboard service", () => {
  it("returns classes with averages", async () => {
    Subject.find.mockResolvedValue([
      { _id: "sub1", name: "Math", type: "CORE" }
    ]);
    Schedule.findOne.mockResolvedValue({
      startTime: "08:00",
      endTime: "10:00",
      classroom: "A1"
    });
    Enrollment.find.mockResolvedValue([
      { student: "s1" },
      { student: "s2" }
    ]);
    Evaluation.findOne.mockResolvedValue({ _id: "e1" });
    EvaluationItem.find.mockResolvedValue([
      { _id: "i1" },
      { _id: "i2" }
    ]);
    Grade.findOne
      .mockResolvedValueOnce({ value: 6 })
      .mockResolvedValueOnce({ value: 8 })
      .mockResolvedValueOnce({ value: 10 })
      .mockResolvedValueOnce(null);

    const result = await getTeacherDashboard("t1");

    expect(result.classes).toHaveLength(1);
    expect(result.classes[0].classAverage).toBe(8.5);
  });

  it("skips subjects without schedule", async () => {
    Subject.find.mockResolvedValue([
      { _id: "sub1", name: "Math", type: "CORE" }
    ]);
    Schedule.findOne.mockResolvedValue(null);

    const result = await getTeacherDashboard("t1");

    expect(result.classes).toEqual([]);
  });

  it("returns class with null average when no evaluation", async () => {
    Subject.find.mockResolvedValue([
      { _id: "sub1", name: "Math", type: "CORE" }
    ]);
    Schedule.findOne.mockResolvedValue({
      startTime: "08:00",
      endTime: "10:00",
      classroom: "A1"
    });
    Enrollment.find.mockResolvedValue([{ student: "s1" }]);
    Evaluation.findOne.mockResolvedValue(null);

    const result = await getTeacherDashboard("t1");

    expect(result.classes[0].classAverage).toBeNull();
  });

  it("returns null average when no grades are found", async () => {
    Subject.find.mockResolvedValue([
      { _id: "sub1", name: "Math", type: "CORE" }
    ]);
    Schedule.findOne.mockResolvedValue({
      startTime: "08:00",
      endTime: "10:00",
      classroom: "A1"
    });
    Enrollment.find.mockResolvedValue([{ student: "s1" }]);
    Evaluation.findOne.mockResolvedValue({ _id: "e1" });
    EvaluationItem.find.mockResolvedValue([{ _id: "i1" }]);
    Grade.findOne.mockResolvedValue(null);

    const result = await getTeacherDashboard("t1");

    expect(result.classes[0].classAverage).toBeNull();
  });
});
