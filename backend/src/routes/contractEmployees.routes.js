const express = require("express");
const router = express.Router();

const c = require("../controllers/contractEmployees.controller");
const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");

// CRUD
router.get("/", requireAuth, requirePermission("employees:read"), c.listContractEmployees);
router.get("/:employeeId", requireAuth, requirePermission("employees:read"), c.getContractEmployeeByEmployeeId);

router.post("/", requireAuth, requirePermission("employees:update"), c.createContractEmployee);
router.put("/:employeeId", requireAuth, requirePermission("employees:update"), c.updateContractEmployee);
router.delete("/:employeeId", requireAuth, requirePermission("employees:update"), c.deleteContractEmployee);

module.exports = router;
