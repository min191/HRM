// src/routes/monthlySalary.routes.js
const express = require("express");
const router = express.Router();
const monthlySalaryController = require("../controllers/monthlySalary.controller");

// Các route cho Monthly Salary
router.get("/", monthlySalaryController.getAllMonthlySalaries);  // Lấy tất cả Monthly Salary
router.get("/:employeeId", monthlySalaryController.getMonthlySalaryByEmployeeId);  // Lấy Monthly Salary của nhân viên theo employeeId
router.post("/", monthlySalaryController.addMonthlySalary);  // Thêm Monthly Salary mới
router.put("/:id", monthlySalaryController.updateMonthlySalary);  // Cập nhật Monthly Salary
router.delete("/:id", monthlySalaryController.deleteMonthlySalary);  // Xóa Monthly Salary

module.exports = router;
