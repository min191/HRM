// src/controllers/workAssignment.controller.js
const workAssignmentService = require("../services/workAssignment.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả công việc đã phân công
  async getAllWorkAssignments(req, res, next) {
    try {
      const workAssignments = await workAssignmentService.getAllWorkAssignments();
      res.status(200).json(workAssignments);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy công việc theo employeeId
  async getWorkAssignmentByEmployeeId(req, res, next) {
    try {
      const { employeeId } = req.params;
      const workAssignments = await workAssignmentService.getWorkAssignmentByEmployeeId(employeeId);
      if (workAssignments.length === 0) {
        return next(new ApiError(404, "No work assignment found for this employee"));
      }
      res.status(200).json(workAssignments);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm một công việc mới
  async addWorkAssignment(req, res, next) {
    try {
      const { employeeId, departmentId, positionId, taskName, assignedDate, deadline, status, notes, assignedByAccountId } = req.body;
      const newWorkAssignment = { employeeId, departmentId, positionId, taskName, assignedDate, deadline, status, notes, assignedByAccountId };
      const insertId = await workAssignmentService.addWorkAssignment(newWorkAssignment);
      res.status(201).json({ message: "Work assignment created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
