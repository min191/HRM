// src/controllers/monthlyAttendance.controller.js
const monthlyAttendanceService = require("../services/monthlyAttendance.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả các bản ghi Monthly Attendance
  async getAllMonthlyAttendance(req, res, next) {
    try {
      const monthlyAttendance = await monthlyAttendanceService.getAllMonthlyAttendance();
      res.status(200).json(monthlyAttendance);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy Monthly Attendance của nhân viên theo employeeId
  async getMonthlyAttendanceByEmployeeId(req, res, next) {
    try {
      const { employeeId } = req.params;
      const monthlyAttendance = await monthlyAttendanceService.getMonthlyAttendanceByEmployeeId(employeeId);
      if (monthlyAttendance.length === 0) {
        return next(new ApiError(404, "No monthly attendance found for this employee"));
      }
      res.status(200).json(monthlyAttendance);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm Monthly Attendance mới
  async addMonthlyAttendance(req, res, next) {
    try {
      const { employeeId, month, year, totalDaysWorked, status, submittedByAccountId } = req.body;
      const newAttendance = { employeeId, month, year, totalDaysWorked, status, submittedByAccountId };
      const insertId = await monthlyAttendanceService.addMonthlyAttendance(newAttendance);
      res.status(201).json({ message: "Monthly attendance created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Cập nhật Monthly Attendance
  async updateMonthlyAttendance(req, res, next) {
    try {
      const { id } = req.params;
      const { totalDaysWorked, status, submittedByAccountId, approvedByAccountId, rejectReason } = req.body;
      const updated = await monthlyAttendanceService.updateMonthlyAttendance(id, {
        totalDaysWorked,
        status,
        submittedByAccountId,
        approvedByAccountId,
        rejectReason
      });
      if (!updated) {
        return next(new ApiError(404, "Monthly attendance not found"));
      }
      res.status(200).json({ message: "Monthly attendance updated successfully" });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Xóa Monthly Attendance
  async removeMonthlyAttendance(req, res, next) {
    try {
      const { id } = req.params;
      const removed = await monthlyAttendanceService.removeMonthlyAttendance(id);
      if (!removed) {
        return next(new ApiError(404, "Monthly attendance not found"));
      }
      res.status(200).json({ message: "Monthly attendance deleted successfully" });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
