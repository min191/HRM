// src/routes/permissions.routes.js
const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");  // Đảm bảo import đúng
const c = require("../controllers/permissions.controller");

// list permissions
router.get("/", requireAuth, requirePermission("accounts:read"), c.listPermissions);

// role permissions: get + set
router.get("/roles/:role", requireAuth, requirePermission("accounts:read"), c.getRolePermissions);
router.put("/roles/:role", requireAuth, requirePermission("accounts:update"), c.setRolePermissions);

module.exports = router;
