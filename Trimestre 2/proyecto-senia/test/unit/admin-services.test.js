import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/models/user-model.js", () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/course-model.js", () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/subject-model.js", () => ({
  default: {
    create: vi.fn(),
    find: vi.fn(),
    findById: vi.fn()
  }
}));

vi.mock("../../src/models/enrollment-model.js", () => ({
  default: {
    create: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("../../src/models/schedule-model.js", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
    find: vi.fn()
  }
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn()
  }
}));

const { default: User } = await import("../../src/models/user-model.js");
const { default: Course } = await import("../../src/models/course-model.js");
const { default: Subject } = await import("../../src/models/subject-model.js");
const { default: Enrollment } = await import(
  "../../src/models/enrollment-model.js"
);
const { default: Schedule } = await import(
  "../../src/models/schedule-model.js"
);
const bcrypt = (await import("bcrypt")).default;

const {
  createUser,
  getUsers
} = await import("../../src/services/admin/admin-users-service.js");

const {
  createCourse,
  getCourses
} = await import("../../src/services/admin/admin-courses-service.js");

const {
  createSubject,
  getSubjectsByCourse
} = await import("../../src/services/admin/admin-subjects-service.js");

const {
  enrollStudent,
  getEnrollmentsBySubject
} = await import("../../src/services/admin/admin-enrollments-service.js");

const {
  upsertSchedule,
  getSchedulesBySubject
} = await import("../../src/services/admin/admin-schedules-service.js");

beforeEach(() => {
  vi.clearAllMocks();
});

const makePopulateSortQuery = (result) => ({
  populate: vi.fn().mockReturnThis(),
  sort: vi.fn().mockResolvedValue(result)
});

describe("admin users service", () => {
  it("creates a user when data is valid", async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed");
    User.create.mockResolvedValue({
      _id: "u1",
      name: "Ana",
      email: "ana@example.com",
      role: "ADMIN",
      active: true
    });

    const result = await createUser({
      name: "Ana",
      email: "ana@example.com",
      password: "pass",
      role: "ADMIN"
    });

    expect(User.create).toHaveBeenCalled();
    expect(result).toEqual({
      id: "u1",
      name: "Ana",
      email: "ana@example.com",
      role: "ADMIN",
      active: true
    });
  });

  it("rejects when data is incomplete", async () => {
    await expect(createUser({ name: "Ana" })).rejects.toThrow(
      "Datos incompletos"
    );
  });

  it("rejects when user already exists", async () => {
    User.findOne.mockResolvedValue({ _id: "u1" });

    await expect(
      createUser({ name: "Ana", email: "ana@example.com", password: "x", role: "ADMIN" })
    ).rejects.toThrow("El usuario ya existe");
  });

  it("getUsers sorts by createdAt desc", async () => {
    const query = { sort: vi.fn().mockResolvedValue([{ id: 1 }]) };
    User.find.mockReturnValue(query);

    const result = await getUsers();

    expect(User.find).toHaveBeenCalledWith({}, "-password");
    expect(query.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe("admin courses service", () => {
  it("creates a course", async () => {
    Course.findOne.mockResolvedValue(null);
    Course.create.mockResolvedValue({ _id: "c1", name: "1A" });

    const result = await createCourse({ name: "1A" });

    expect(result).toEqual({ _id: "c1", name: "1A" });
  });

  it("rejects when name missing", async () => {
    await expect(createCourse({})).rejects.toThrow(
      "El nombre del curso es obligatorio"
    );
  });

  it("rejects when course exists", async () => {
    Course.findOne.mockResolvedValue({ _id: "c1" });

    await expect(createCourse({ name: "1A" })).rejects.toThrow(
      "El curso ya existe"
    );
  });

  it("getCourses sorts by createdAt desc", async () => {
    const query = { sort: vi.fn().mockResolvedValue([{ id: 1 }]) };
    Course.find.mockReturnValue(query);

    const result = await getCourses();

    expect(query.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe("admin subjects service", () => {
  it("creates a subject when data is valid", async () => {
    Course.findById.mockResolvedValue({ _id: "c1" });
    User.findById.mockResolvedValue({ _id: "t1", role: "TEACHER" });
    Subject.create.mockResolvedValue({ _id: "s1", name: "Math" });

    const result = await createSubject({
      name: "Math",
      course: "c1",
      teacher: "t1",
      type: "CORE"
    });

    expect(result).toEqual({ _id: "s1", name: "Math" });
  });

  it("rejects when data is incomplete", async () => {
    await expect(createSubject({ name: "Math" })).rejects.toThrow(
      "Datos incompletos"
    );
  });

  it("rejects when course is missing", async () => {
    Course.findById.mockResolvedValue(null);

    await expect(
      createSubject({ name: "Math", course: "c1", teacher: "t1", type: "CORE" })
    ).rejects.toThrow("Curso no encontrado");
  });

  it("rejects when teacher is invalid", async () => {
    Course.findById.mockResolvedValue({ _id: "c1" });
    User.findById.mockResolvedValue({ _id: "t1", role: "STUDENT" });

    await expect(
      createSubject({ name: "Math", course: "c1", teacher: "t1", type: "CORE" })
    ).rejects.toThrow("profesor");
  });

  it("getSubjectsByCourse populates and sorts", async () => {
    const query = makePopulateSortQuery([{ id: 1 }]);
    Subject.find.mockReturnValue(query);

    const result = await getSubjectsByCourse("c1");

    expect(query.populate).toHaveBeenCalledWith("teacher", "name email");
    expect(query.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe("admin enrollments service", () => {
  it("enrolls a student", async () => {
    User.findById.mockResolvedValue({ _id: "s1", role: "STUDENT" });
    Subject.findById.mockResolvedValue({ _id: "sub1" });
    Enrollment.create.mockResolvedValue({ _id: "e1" });

    const result = await enrollStudent({
      student: "s1",
      subject: "sub1"
    });

    expect(Enrollment.create).toHaveBeenCalled();
    expect(result).toEqual({ _id: "e1" });
  });

  it("rejects when data is incomplete", async () => {
    await expect(enrollStudent({ student: "s1" })).rejects.toThrow(
      "Datos incompletos"
    );
  });

  it("rejects when student invalid", async () => {
    User.findById.mockResolvedValue({ _id: "s1", role: "TEACHER" });

    await expect(
      enrollStudent({ student: "s1", subject: "sub1" })
    ).rejects.toThrow("alumno");
  });

  it("rejects when subject not found", async () => {
    User.findById.mockResolvedValue({ _id: "s1", role: "STUDENT" });
    Subject.findById.mockResolvedValue(null);

    await expect(
      enrollStudent({ student: "s1", subject: "sub1" })
    ).rejects.toThrow("Asignatura no encontrada");
  });

  it("getEnrollmentsBySubject populates and sorts", async () => {
    const query = makePopulateSortQuery([{ id: 1 }]);
    Enrollment.find.mockReturnValue(query);

    const result = await getEnrollmentsBySubject("sub1");

    expect(query.populate).toHaveBeenCalledWith("student", "name email");
    expect(query.sort).toHaveBeenCalledWith({ createdAt: 1 });
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe("admin schedules service", () => {
  it("upserts schedule when data is valid", async () => {
    Subject.findById.mockResolvedValue({ _id: "sub1" });
    Schedule.findOneAndUpdate.mockResolvedValue({ _id: "sch1" });

    const result = await upsertSchedule("sub1", {
      dayOfWeek: 1,
      startTime: "08:00",
      endTime: "10:00",
      classroom: "A1"
    });

    expect(Schedule.findOneAndUpdate).toHaveBeenCalled();
    expect(result).toEqual({ _id: "sch1" });
  });

  it("rejects when subject not found", async () => {
    Subject.findById.mockResolvedValue(null);

    await expect(
      upsertSchedule("sub1", {
        dayOfWeek: 1,
        startTime: "08:00",
        endTime: "10:00",
        classroom: "A1"
      })
    ).rejects.toThrow("Asignatura no encontrada");
  });

  it("rejects when data incomplete", async () => {
    await expect(upsertSchedule("sub1", { dayOfWeek: 1 })).rejects.toThrow(
      "Datos incompletos"
    );
  });

  it("getSchedulesBySubject sorts by dayOfWeek", async () => {
    const query = { sort: vi.fn().mockResolvedValue([{ id: 1 }]) };
    Schedule.find.mockReturnValue(query);

    const result = await getSchedulesBySubject("sub1");

    expect(query.sort).toHaveBeenCalledWith({ dayOfWeek: 1 });
    expect(result).toEqual([{ id: 1 }]);
  });
});
