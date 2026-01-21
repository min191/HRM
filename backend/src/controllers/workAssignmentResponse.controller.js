// src/controllers/workAssignmentResponse.controller.js
const workAssignmentResponseService = require("../services/workAssignmentResponse.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả các phản hồi công việc
  async getAllWorkAssignmentResponses(req, res, next) {
    try {
      const workAssignmentResponses = await workAssignmentResponseService.getAllWorkAssignmentResponses();
      res.status(200).json(workAssignmentResponses);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy phản hồi công việc theo workAssignmentId và employeeId
  async getWorkAssignmentResponseByIds(req, res, next) {
    try {
      const { workAssignmentId, employeeId } = req.params;
      const workAssignmentResponse = await workAssignmentResponseService.getWorkAssignmentResponseByIds(workAssignmentId, employeeId);
      if (workAssignmentResponse.length === 0) {
        return next(new ApiError(404, "No response found for this work assignment and employee"));
      }
      res.status(200).json(workAssignmentResponse);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm phản hồi công việc
  async addWorkAssignmentResponse(req, res, next) {
    try {
      const { workAssignmentId, employeeId, status, respondedAt, rejectReason } = req.body;
      const newWorkAssignmentResponse = { workAssignmentId, employeeId, status, respondedAt, rejectReason };
      const insertId = await workAssignmentResponseService.addWorkAssignmentResponse(newWorkAssignmentResponse);
      res.status(201).json({ message: "Work assignment response created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
