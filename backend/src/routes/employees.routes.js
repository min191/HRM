// src/routes/employees.routes.js
const express = require("express");
const router = express.Router();

const c = require("../controllers/employees.controller"); // Import đúng controller
const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");

// ===== Employees APIs with RBAC =====

// View employees
router.get(
  "/",
  requireAuth, // Kiểm tra xác thực người dùng
  requirePermission("employees:read"), // Kiểm tra quyền đọc
  c.listEmployees // Đảm bảo bạn gọi đúng controller hàm
);

router.get(
  "/:id",
  requireAuth,
  requirePermission("employees:read"),
  c.getEmployeeById
);

// Create employee
router.post(
  "/",
  requireAuth,
  requirePermission("employees:create"),
  c.createEmployee
);

// Update employee
router.put(
  "/:id",
  requireAuth,
  requirePermission("employees:update"),
  c.updateEmployee
);

// Delete employee
router.delete(
  "/:id",
  requireAuth,
  requirePermission("employees:delete"),
  c.deleteEmployee
);

module.exports = router;
