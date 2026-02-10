import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/models/enrollment-model.js", () => ({
  default: {
    find: vi.fn(),
    findOne: vi.fn()
  }
}));

vi.mock("../../src/models/subject-model.js", () => ({
  default: {
    findById: vi.fn()
  }
}));

vi.mock("../../src/models/evaluation-model.js", () => ({
  default: {
    findById: vi.fn(),
    findOne: vi.fn()
  }
}));

vi.mock("../../src/models/evaluation-item-model.js", () => ({
  default: {
    find: vi.fn()
  }
}));

vi.mock("../../src/models/grade-model.js", () => ({
  default: {
    findOne: vi.fn()
  }
}));

vi.mock("../../src/models/attendance-model.js", () => ({
  default: {
    find: vi.fn()
  }
}));

vi.mock("../../src/models/user-achievement-model.js", () => ({
  default: {
    find: vi.fn()
  }
}));

const { default: Enrollment } = await import(
  "../../src/models/enrollment-model.js"
);
const { default: Subject } = await import("../../src/models/subject-model.js");
const { default: Evaluation } = await import(
  "../../src/models/evaluation-model.js"
);
const { default: EvaluationItem } = await import(
  "../../src/models/evaluation-item-model.js"
);
const { default: Grade } = await import("../../src/models/grade-model.js");
const { default: Attendance } = await import(
  "../../src/models/attendance-model.js"
);
const { default: UserAchievement } = await import(
  "../../src/models/user-achievement-model.js"
);

const { getMyAttendance } = await import(
  "../../src/services/student/student-attendance-service.js"
);
const { getMySubjects } = await import(
  "../../src/services/student/student-subjects-service.js"
);
const { getMySubjectDetail } = await import(
  "../../src/services/student/student-subject-detail-service.js"
);
const { getMyEvaluationGradesSummary } = await import(
  "../../src/services/student/grades-summary-service.js"
);
const { getMyDashboard } = await import(
  "../../src/services/student/student-dashboard-service.js"
);
const { getMyProgress } = await import(
  "../../src/services/student/student-dashboard-progress-service.js"
);
const { getMyAchievements } = await import(
  "../../src/services/student/student-achievements-service.js"
);

beforeEach(() => {
  vi.clearAllMocks();
});

const makeThenableQuery = (result) => ({
  populate: vi.fn().mockReturnThis(),
  sort: vi.fn().mockReturnThis(),
  then: (resolve) => resolve(result)
});

describe("student attendance service", () => {
  it("filters by month and year when provided", async () => {
    const query = { sort: vi.fn().mockResolvedValue([]), populate: vi.fn().mockReturnThis() };
    Attendance.find.mockReturnValue(query);

    await getMyAttendance("s1", { month: 2, year: 2026 });

    const passedQuery = Attendance.find.mock.calls[0][0];
    expect(passedQuery.student).toBe("s1");
    expect(passedQuery.date.$gte).toBeInstanceOf(Date);
    expect(passedQuery.date.$lte).toBeInstanceOf(Date);
    expect(query.populate).toHaveBeenCalledWith("subject", "name");
    expect(query.sort).toHaveBeenCalledWith({ date: 1 });
  });

  it("does not filter dates when month/year missing", async () => {
    const query = { sort: vi.fn().mockResolvedValue([]), populate: vi.fn().mockReturnThis() };
    Attendance.find.mockReturnValue(query);

    await getMyAttendance("s1", {});

    expect(Attendance.find).toHaveBeenCalledWith({ student: "s1" });
  });
});

describe("student subjects service", () => {
  it("maps enrollments to subjects", async () => {
    const enrollments = [
      {
        subject: {
          _id: "sub1",
          name: "Math",
          teacher: { name: "T1" },
          course: { name: "C1" }
        }
      }
    ];
    Enrollment.find.mockReturnValue(makeThenableQuery(enrollments));

    const result = await getMySubjects("s1");

    expect(result).toEqual([
      {
        subjectId: "sub1",
        name: "Math",
        teacher: { name: "T1" },
        course: { name: "C1" }
      }
    ]);
  });
});

describe("student subject detail service", () => {
  it("rejects when student is not enrolled", async () => {
    Enrollment.findOne.mockResolvedValue(null);

    await expect(getMySubjectDetail("s1", "sub1")).rejects.toThrow(
      "matriculado"
    );
  });

  it("returns detail with grades and attendance", async () => {
    Enrollment.findOne.mockResolvedValue({ _id: "e1" });

    const subjectDoc = {
      _id: "sub1",
      name: "Math",
      teacher: { name: "T1" },
      course: { name: "C1" }
    };
    Subject.findById.mockReturnValue(makeThenableQuery(subjectDoc));

    Evaluation.findOne.mockResolvedValue({ _id: "ev1", name: "Ev1" });
    EvaluationItem.find.mockResolvedValue([
      { _id: "i1", name: "Exam" }
    ]);
    Grade.findOne.mockResolvedValue({ value: 8 });

    Attendance.find.mockResolvedValue([
      { status: "PRESENT" },
      { status: "ABSENT" },
      { status: "LATE" }
    ]);

    const result = await getMySubjectDetail("s1", "sub1");

    expect(result.subjectId).toBe("sub1");
    expect(result.grades).toEqual([{ item: "Exam", value: 8 }]);
    expect(result.attendance).toEqual({
      percentage: 33,
      total: 3,
      presents: 1,
      absences: 1,
      lates: 1
    });
  });

  it("sets grade value to null when no grade exists", async () => {
    Enrollment.findOne.mockResolvedValue({ _id: "e1" });

    const subjectDoc = {
      _id: "sub1",
      name: "Math",
      teacher: { name: "T1" },
      course: { name: "C1" }
    };
    Subject.findById.mockReturnValue(makeThenableQuery(subjectDoc));

    Evaluation.findOne.mockResolvedValue({ _id: "ev1", name: "Ev1" });
    EvaluationItem.find.mockResolvedValue([{ _id: "i1", name: "Exam" }]);
    Grade.findOne.mockResolvedValue(null);
    Attendance.find.mockResolvedValue([]);

    const result = await getMySubjectDetail("s1", "sub1");

    expect(result.grades).toEqual([{ item: "Exam", value: null }]);
  });

  it("returns detail when no evaluation and no attendance", async () => {
    Enrollment.findOne.mockResolvedValue({ _id: "e1" });

    const subjectDoc = {
      _id: "sub1",
      name: "Math",
      teacher: { name: "T1" },
      course: { name: "C1" }
    };
    Subject.findById.mockReturnValue(makeThenableQuery(subjectDoc));
    Evaluation.findOne.mockResolvedValue(null);
    Attendance.find.mockResolvedValue([]);

    const result = await getMySubjectDetail("s1", "sub1");

    expect(result.evaluation).toBeNull();
    expect(result.grades).toEqual([]);
    expect(result.attendance).toEqual({
      percentage: 0,
      total: 0,
      presents: 0,
      absences: 0,
      lates: 0
    });
  });
});

describe("student grades summary service", () => {
  it("rejects when evaluation not found", async () => {
    Evaluation.findById.mockResolvedValue(null);

    await expect(
      getMyEvaluationGradesSummary({ studentId: "s1", evaluationId: "e1" })
    ).rejects.toThrow("Evaluaci");
  });

  it("rejects when not enrolled", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Enrollment.findOne.mockResolvedValue(null);

    await expect(
      getMyEvaluationGradesSummary({ studentId: "s1", evaluationId: "e1" })
    ).rejects.toThrow("matriculado");
  });

  it("calculates final grade with weights", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Enrollment.findOne.mockResolvedValue({ _id: "en1" });
    EvaluationItem.find.mockResolvedValue([
      { _id: "i1", name: "Exam", weight: 60 },
      { _id: "i2", name: "Project", weight: 40 }
    ]);
    Grade.findOne
      .mockResolvedValueOnce({ value: 8 })
      .mockResolvedValueOnce({ value: 6 });

    const result = await getMyEvaluationGradesSummary({
      studentId: "s1",
      evaluationId: "e1"
    });

    expect(result.finalGrade).toBe(7.2);
    expect(result.items).toHaveLength(2);
  });

  it("uses 0 when grade is missing", async () => {
    Evaluation.findById.mockResolvedValue({ _id: "e1", subject: "sub1" });
    Enrollment.findOne.mockResolvedValue({ _id: "en1" });
    EvaluationItem.find.mockResolvedValue([{ _id: "i1", name: "Exam", weight: 100 }]);
    Grade.findOne.mockResolvedValue(null);

    const result = await getMyEvaluationGradesSummary({
      studentId: "s1",
      evaluationId: "e1"
    });

    expect(result.finalGrade).toBe(0);
    expect(result.items[0].value).toBe(0);
  });
});

describe("student dashboard service", () => {
  it("builds dashboard with averages and attendance", async () => {
    const enrollments = [
      {
        subject: {
          _id: "sub1",
          name: "Math",
          teacher: { name: "T1" }
        }
      }
    ];
    Enrollment.find.mockReturnValue(makeThenableQuery(enrollments));
    Evaluation.findOne.mockResolvedValue({ _id: "e1" });
    EvaluationItem.find.mockResolvedValue([
      { _id: "i1" },
      { _id: "i2" }
    ]);

    Grade.findOne
      .mockResolvedValueOnce({ value: 7 })
      .mockResolvedValueOnce({ value: 9 });

    Attendance.find.mockResolvedValue([
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "ABSENT" }
    ]);

    const result = await getMyDashboard("s1");

    expect(result.subjects).toEqual([
      {
        subjectId: "sub1",
        name: "Math",
        teacher: "T1",
        averageGrade: 8,
        attendancePercentage: 67
      }
    ]);
  });

  it("handles subjects with no evaluation or attendance", async () => {
    const enrollments = [
      {
        subject: {
          _id: "sub1",
          name: "Math",
          teacher: { name: "T1" }
        }
      }
    ];
    Enrollment.find.mockReturnValue(makeThenableQuery(enrollments));
    Evaluation.findOne.mockResolvedValue(null);
    Attendance.find.mockResolvedValue([]);

    const result = await getMyDashboard("s1");

    expect(result.subjects[0].averageGrade).toBeNull();
    expect(result.subjects[0].attendancePercentage).toBe(0);
  });

  it("keeps averageGrade null when no grades exist", async () => {
    const enrollments = [
      {
        subject: {
          _id: "sub1",
          name: "Math",
          teacher: { name: "T1" }
        }
      }
    ];
    Enrollment.find.mockReturnValue(makeThenableQuery(enrollments));
    Evaluation.findOne.mockResolvedValue({ _id: "e1" });
    EvaluationItem.find.mockResolvedValue([{ _id: "i1" }]);
    Grade.findOne.mockResolvedValue(null);
    Attendance.find.mockResolvedValue([]);

    const result = await getMyDashboard("s1");

    expect(result.subjects[0].averageGrade).toBeNull();
  });
});

describe("student progress and achievements", () => {
  it("computes level and progress", async () => {
    const achievements = [
      { achievement: { name: "A1", description: "D1" }, achievedAt: "2026-01-01" },
      { achievement: { name: "A2", description: "D2" }, achievedAt: "2026-01-02" },
      { achievement: { name: "A3", description: "D3" }, achievedAt: "2026-01-03" }
    ];
    UserAchievement.find.mockReturnValue(makeThenableQuery(achievements));

    const result = await getMyProgress("s1");

    expect(result.level.number).toBe(2);
    expect(result.progress).toEqual({ current: 3, min: 2, max: 4 });
    expect(result.recentAchievements).toHaveLength(2);
  });

  it("maps achievements list", async () => {
    const achievements = [
      {
        achievement: {
          _id: "a1",
          name: "A1",
          description: "D1",
          icon: "I1"
        },
        achievedAt: "2026-01-01"
      }
    ];
    UserAchievement.find.mockReturnValue(makeThenableQuery(achievements));

    const result = await getMyAchievements("s1");

    expect(result).toEqual([
      {
        id: "a1",
        name: "A1",
        description: "D1",
        icon: "I1",
        achievedAt: "2026-01-01"
      }
    ]);
  });
});
