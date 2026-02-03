import * as schedulesService from "../../services/admin/admin-schedules-service.js";

export const upsertSchedule = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const schedule = await schedulesService.upsertSchedule(
      subjectId,
      req.body
    );
    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const getSchedulesBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const schedules =
      await schedulesService.getSchedulesBySubject(subjectId);
    res.json(schedules);
  } catch (error) {
    next(error);
  }
};
