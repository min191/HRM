import * as attendanceService from '../services/attendance.service.js';

export const markAttendance = async (req, res, next) => {
  try {
    const record = await attendanceService.mark(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyAttendance = async (req, res, next) => {
  try {
    const data = await attendanceService.getMonthly(
      req.params.employeeId,
      req.query.month,
      req.query.year
    );
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
