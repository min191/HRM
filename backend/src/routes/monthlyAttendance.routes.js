// src/routes/monthlyAttendance.routes.js
const express = require("express");
const router = express.Router();
const monthlyAttendanceController = require("../controllers/monthlyAttendance.controller");

// Các route cho Monthly Attendance
router.get("/", monthlyAttendanceController.getAllMonthlyAttendance);  // Lấy tất cả Monthly Attendance
router.get("/:employeeId", monthlyAttendanceController.getMonthlyAttendanceByEmployeeId);  // Lấy Monthly Attendance của nhân viên theo employeeId
router.post("/", monthlyAttendanceController.addMonthlyAttendance);  // Thêm Monthly Attendance mới
router.put("/:id", monthlyAttendanceController.updateMonthlyAttendance);  // Cập nhật Monthly Attendance
router.delete("/:id", monthlyAttendanceController.removeMonthlyAttendance);  // Xóa Monthly Attendance

module.exports = router;
