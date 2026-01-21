const express = require('express');
const router = express.Router();
const familyMemberController = require("../controllers/familyMember.controller");
const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");

// Route để lấy danh sách FamilyMembers
router.get(
  "/",
  requireAuth, // Kiểm tra xác thực người dùng
  requirePermission("familyMembers:read"), // Kiểm tra quyền đọc
  familyMemberController.list // Controller xử lý
);

// Route để lấy FamilyMember theo ID
router.get(
  "/:id",
  requireAuth,
  requirePermission("familyMembers:read"),
  familyMemberController.getById
);

// Route để thêm FamilyMember mới
router.post(
  "/",
  requireAuth,
  requirePermission("familyMembers:create"),
  familyMemberController.create
);

// Route để cập nhật FamilyMember theo ID
router.put(
  "/:id",
  requireAuth,
  requirePermission("familyMembers:update"),
  familyMemberController.update
);

// Route để xóa FamilyMember theo ID
router.delete(
  "/:id",
  requireAuth,
  requirePermission("familyMembers:delete"),
  familyMemberController.remove
);

module.exports = router;
