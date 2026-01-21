const express = require("express");
const router = express.Router();

const c = require("../controllers/permanentEmployees.controller");
const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");

// CRUD
router.get(
  "/",
  requireAuth,
  requirePermission("employees:read"),
  c.listPermanentEmployees
);

router.get(
  "/:employeeId",
  requireAuth,
  requirePermission("employees:read"),
  c.getPermanentEmployeeByEmployeeId
);

router.post(
  "/",
  requireAuth,
  requirePermission("employees:update"),
  c.createPermanentEmployee
);

router.put(
  "/:employeeId",
  requireAuth,
  requirePermission("employees:update"),
  c.updatePermanentEmployee
);

router.delete(
  "/:employeeId",
  requireAuth,
  requirePermission("employees:update"),
  c.deletePermanentEmployee
);

module.exports = router;
