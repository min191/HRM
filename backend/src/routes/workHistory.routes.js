// src/routes/workHistory.routes.js
const express = require("express");
const router = express.Router();
const workHistoryController = require("../controllers/workHistory.controller");

// Các route cho WorkHistory
router.get("/", workHistoryController.getAllWorkHistories);  // Lấy tất cả lịch sử công tác
router.get("/:employeeId", workHistoryController.getWorkHistoryByEmployeeId);  // Lấy lịch sử công tác theo employeeId
router.post("/", workHistoryController.addWorkHistory);  // Thêm mới lịch sử công tác

module.exports = router;
