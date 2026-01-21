// src/routes/benefits.routes.js
const express = require("express");
const router = express.Router();
const benefitsController = require("../controllers/benefits.controller");

// Các route cho Benefits
router.get("/", benefitsController.getAllBenefits);  // Lấy tất cả Benefit
router.get("/:employeeId", benefitsController.getBenefitsByEmployeeId);  // Lấy Benefit của nhân viên theo employeeId
router.post("/", benefitsController.addBenefit);  // Thêm Benefit mới
router.put("/:id", benefitsController.updateBenefit);  // Cập nhật Benefit
router.delete("/:id", benefitsController.removeBenefit);  // Xóa Benefit

module.exports = router;
