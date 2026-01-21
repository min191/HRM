// src/controllers/monthlySalary.controller.js
const monthlySalaryService = require("../services/monthlySalary.service");
const ApiError = require("../utils/ApiError");

module.exports = {
  // Lấy tất cả Monthly Salary
  async getAllMonthlySalaries(req, res, next) {
    try {
      const salaries = await monthlySalaryService.getAllMonthlySalaries();
      res.json({ success: true, data: salaries });
    } catch (e) {
      next(e);
    }
  },

  // Lấy Monthly Salary của nhân viên theo employeeId
  async getMonthlySalaryByEmployeeId(req, res, next) {
    try {
      const { employeeId } = req.params;
      const salaries = await monthlySalaryService.getMonthlySalaryByEmployeeId(employeeId);
      if (salaries.length === 0) {
        return next(new ApiError(404, "No monthly salary found for this employee"));
      }
      res.json({ success: true, data: salaries });
    } catch (e) {
      next(e);
    }
  },

  // Thêm Monthly Salary mới
  async addMonthlySalary(req, res, next) {
    try {
      const {
        employeeId, month, year, employeeType, salaryGradeId, applicableRate, baseSalary,
        totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, status,
        approvedByAccountId
      } = req.body;

      const newSalary = {
        employeeId, month, year, employeeType, salaryGradeId, applicableRate, baseSalary,
        totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, status, 
        approvedByAccountId
      };

      const createdSalary = await monthlySalaryService.addMonthlySalary(newSalary);
      res.status(201).json({ success: true, data: createdSalary });
    } catch (e) {
      next(e);
    }
  },

  // Cập nhật Monthly Salary
  async updateMonthlySalary(req, res, next) {
    try {
      const { id } = req.params;
      const { baseSalary, totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, 
        netSalary, status, approvedByAccountId } = req.body;

      const updatedSalary = await monthlySalaryService.updateMonthlySalary(id, {
        baseSalary, totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, 
        status, approvedByAccountId
      });

      if (!updatedSalary) {
        return next(new ApiError(404, "Monthly Salary not found"));
      }

      res.json({ success: true, data: updatedSalary });
    } catch (e) {
      next(e);
    }
  },

  // Xóa Monthly Salary
  async deleteMonthlySalary(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await monthlySalaryService.deleteMonthlySalary(id);
      if (!deleted) {
        return next(new ApiError(404, "Monthly Salary not found"));
      }

      res.json({ success: true, message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
};
