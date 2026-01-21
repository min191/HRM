// src/routes/workAssignment.routes.js
const express = require("express");
const router = express.Router();
const workAssignmentController = require("../controllers/workAssignment.controller");

// Các route cho WorkAssignment
router.get("/", workAssignmentController.getAllWorkAssignments);  // Lấy tất cả công việc đã phân công
router.get("/:employeeId", workAssignmentController.getWorkAssignmentByEmployeeId);  // Lấy công việc theo employeeId
router.post("/", workAssignmentController.addWorkAssignment);  // Thêm công việc mới

module.exports = router;
