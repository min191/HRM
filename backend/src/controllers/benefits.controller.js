// src/controllers/benefits.controller.js
const benefitsService = require("../services/benefits.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả các bản ghi Benefit
  async getAllBenefits(req, res, next) {
    try {
      const benefits = await benefitsService.getAllBenefits();
      res.status(200).json(benefits);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Lấy Benefit của nhân viên theo employeeId
  async getBenefitsByEmployeeId(req, res, next) {
    try {
      const { employeeId } = req.params;
      const benefits = await benefitsService.getBenefitsByEmployeeId(employeeId);
      if (benefits.length === 0) {
        return next(new ApiError(404, "No benefits found for this employee"));
      }
      res.status(200).json(benefits);
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Thêm Benefit mới
  async addBenefit(req, res, next) {
    try {
      const { employeeId, type, name, value, startDate, endDate, notes, calcType, applyByAttendance } = req.body;
      const newBenefit = { employeeId, type, name, value, startDate, endDate, notes, calcType, applyByAttendance };
      const insertId = await benefitsService.addBenefit(newBenefit);
      res.status(201).json({ message: "Benefit created successfully", insertId });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Cập nhật Benefit
  async updateBenefit(req, res, next) {
    try {
      const { id } = req.params;
      const { type, name, value, startDate, endDate, notes, calcType, applyByAttendance } = req.body;
      const updated = await benefitsService.updateBenefit(id, { type, name, value, startDate, endDate, notes, calcType, applyByAttendance });
      if (!updated) {
        return next(new ApiError(404, "Benefit not found"));
      }
      res.status(200).json({ message: "Benefit updated successfully" });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  },

  // Xóa Benefit
  async removeBenefit(req, res, next) {
    try {
      const { id } = req.params;
      const removed = await benefitsService.removeBenefit(id);
      if (!removed) {
        return next(new ApiError(404, "Benefit not found"));
      }
      res.status(200).json({ message: "Benefit deleted successfully" });
    } catch (error) {
      next(new ApiError(500, "Something went wrong"));
    }
  }
};
