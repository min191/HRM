// src/routes/dailyAttendance.routes.js
const express = require("express");
const router = express.Router();
const dailyAttendanceController = require("../controllers/dailyAttendance.controller");

// Các route cho DailyAttendance
router.get("/", dailyAttendanceController.getAllDailyAttendance);  // Lấy tất cả bản ghi chấm công hàng ngày
router.get("/:employeeId/:date", dailyAttendanceController.getDailyAttendanceByEmployeeAndDate);  // Lấy bản ghi chấm công theo employeeId và date
router.post("/", dailyAttendanceController.addDailyAttendance);  // Thêm bản ghi chấm công
router.put("/:id", dailyAttendanceController.updateDailyAttendance);  // Cập nhật bản ghi chấm công

module.exports = router;
