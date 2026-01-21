const express = require("express");
const router = express.Router();

const c = require("../controllers/attendancePolicy.controller.js");

router.get("/ping", (req, res) => {
  res.json({ ok: true, ping: "attendance-policies" });
});


// CRUD
router.get("/", c.listPolicies);        // GET  /api/attendance-policies
router.get("/:id", c.getPolicyById);    // GET  /api/attendance-policies/:id
router.post("/", c.createPolicy);       // POST /api/attendance-policies
router.put("/:id", c.updatePolicy);     // PUT  /api/attendance-policies/:id
router.delete("/:id", c.deletePolicy);  // DELETE /api/attendance-policies/:id

module.exports = router;
