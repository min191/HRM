const express = require("express");
const router = express.Router();

const c = require("../controllers/approvals.controller");
const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");

// list with filters: ?employeeId=&status=&type=
router.get("/", requireAuth, requirePermission("approvals:read"), c.listApprovals);

// get by id
router.get("/:id", requireAuth, requirePermission("approvals:read"), c.getApprovalById);

// create (employee request)
router.post("/", requireAuth, requirePermission("approvals:create"), c.createApproval);

// update (only while Pending)
router.put("/:id", requireAuth, requirePermission("approvals:create"), c.updateApproval);

// delete (only while Pending)
router.delete("/:id", requireAuth, requirePermission("approvals:create"), c.deleteApproval);

// workflow
router.post("/:id/submit", requireAuth, requirePermission("approvals:create"), c.submitApproval);
router.post("/:id/approve", requireAuth, requirePermission("approvals:approve"), c.approveApproval);
router.post("/:id/reject", requireAuth, requirePermission("approvals:approve"), c.rejectApproval);

module.exports = router;
