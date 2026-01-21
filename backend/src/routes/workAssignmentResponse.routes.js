// src/routes/workAssignmentResponse.routes.js
const express = require("express");
const router = express.Router();
const workAssignmentResponseController = require("../controllers/workAssignmentResponse.controller");

// Các route cho WorkAssignmentResponse
router.get("/", workAssignmentResponseController.getAllWorkAssignmentResponses);  // Lấy tất cả phản hồi công việc
router.get("/:workAssignmentId/:employeeId", workAssignmentResponseController.getWorkAssignmentResponseByIds);  // Lấy phản hồi công việc theo workAssignmentId và employeeId
router.post("/", workAssignmentResponseController.addWorkAssignmentResponse);  // Thêm phản hồi công việc

module.exports = router;
