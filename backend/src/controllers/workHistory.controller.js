// src/controllers/workHistory.controller.js
const workHistoryService = require("../services/workHistory.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả lịch sử công tác
  async getAllWorkHistories(req, res, next) {
    try {
      const workHistories = await workHistoryService.getAllWorkHistories();
      res.status(200).json(workHistories);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy lịch sử công tác theo employeeId
  async getWorkHistoryByEmployeeId(req, res, next) {
    try {
      const { employeeId } = req.params;
      const workHistories = await workHistoryService.getWorkHistoryByEmployeeId(employeeId);
      if (workHistories.length === 0) {
        return next(new ApiError(404, "No work history found for this employee"));
      }
      res.status(200).json(workHistories);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm mới lịch sử công tác
  async addWorkHistory(req, res, next) {
    try {
      const { employeeId, departmentId, positionId, eventType, effectiveDate, endDate, decisionNumber, content } = req.body;
      const newWorkHistory = { employeeId, departmentId, positionId, eventType, effectiveDate, endDate, decisionNumber, content };
      const insertId = await workHistoryService.addWorkHistory(newWorkHistory);
      res.status(201).json({ message: "Work history created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
