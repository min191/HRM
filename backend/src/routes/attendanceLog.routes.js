// src/routes/attendanceLog.routes.js
const express = require("express");
const router = express.Router();
const attendanceLogController = require("../controllers/attendanceLog.controller");

// Các route cho AttendanceLogs
router.get("/", attendanceLogController.getAllAttendanceLogs);  // Lấy tất cả bản ghi chấm công
router.get("/:employeeId/:workDate", attendanceLogController.getAttendanceLogByEmployeeAndDate);  // Lấy bản ghi chấm công theo employeeId và workDate
router.post("/", attendanceLogController.addAttendanceLog);  // Thêm bản ghi chấm công
router.put("/:id", attendanceLogController.updateAttendanceLog);  // Cập nhật bản ghi chấm công

module.exports = router;
