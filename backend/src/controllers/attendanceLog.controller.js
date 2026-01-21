// src/controllers/attendanceLog.controller.js
const attendanceLogService = require("../services/attendanceLog.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả các bản ghi chấm công
  async getAllAttendanceLogs(req, res, next) {
    try {
      const attendanceLogs = await attendanceLogService.getAllAttendanceLogs();
      res.status(200).json(attendanceLogs);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy bản ghi chấm công của nhân viên theo ngày
  async getAttendanceLogByEmployeeAndDate(req, res, next) {
    try {
      const { employeeId, workDate } = req.params;
      const attendanceLog = await attendanceLogService.getAttendanceLogByEmployeeAndDate(employeeId, workDate);
      if (attendanceLog.length === 0) {
        return next(new ApiError(404, "No attendance record found"));
      }
      res.status(200).json(attendanceLog);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm bản ghi chấm công
  async addAttendanceLog(req, res, next) {
    try {
      const { employeeId, workDate, checkInAt, checkOutAt, workedMinutes, status, createdByAccountId, updatedByAccountId, note } = req.body;
      const newAttendanceLog = { employeeId, workDate, checkInAt, checkOutAt, workedMinutes, status, createdByAccountId, updatedByAccountId, note };
      const insertId = await attendanceLogService.addAttendanceLog(newAttendanceLog);
      res.status(201).json({ message: "Attendance log created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Cập nhật bản ghi chấm công
  async updateAttendanceLog(req, res, next) {
    try {
      const { id } = req.params;
      const { checkOutAt, workedMinutes, status, updatedByAccountId, note } = req.body;
      const updated = await attendanceLogService.updateAttendanceLog(id, { checkOutAt, workedMinutes, status, updatedByAccountId, note });
      if (!updated) {
        return next(new ApiError(404, "Attendance log not found"));
      }
      res.status(200).json({ message: "Attendance log updated successfully" });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
