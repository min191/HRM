// src/controllers/dailyAttendance.controller.js
const dailyAttendanceService = require("../services/dailyAttendance.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả các bản ghi chấm công hàng ngày
  async getAllDailyAttendance(req, res, next) {
    try {
      const dailyAttendance = await dailyAttendanceService.getAllDailyAttendance();
      res.status(200).json(dailyAttendance);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy bản ghi chấm công của nhân viên theo ngày
  async getDailyAttendanceByEmployeeAndDate(req, res, next) {
    try {
      const { employeeId, date } = req.params;
      const dailyAttendance = await dailyAttendanceService.getDailyAttendanceByEmployeeAndDate(employeeId, date);
      if (dailyAttendance.length === 0) {
        return next(new ApiError(404, "No attendance record found"));
      }
      res.status(200).json(dailyAttendance);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm bản ghi chấm công cho nhân viên
  async addDailyAttendance(req, res, next) {
    try {
      const { employeeId, date, status, hoursWorked, notes, createdByAccountId, updatedByAccountId } = req.body;
      const newDailyAttendance = { employeeId, date, status, hoursWorked, notes, createdByAccountId, updatedByAccountId };
      const insertId = await dailyAttendanceService.addDailyAttendance(newDailyAttendance);
      res.status(201).json({ message: "Daily attendance created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Cập nhật bản ghi chấm công
  async updateDailyAttendance(req, res, next) {
    try {
      const { id } = req.params;
      const { status, hoursWorked, notes, updatedByAccountId } = req.body;
      const updated = await dailyAttendanceService.updateDailyAttendance(id, { status, hoursWorked, notes, updatedByAccountId });
      if (!updated) {
        return next(new ApiError(404, "Attendance record not found"));
      }
      res.status(200).json({ message: "Daily attendance updated successfully" });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
