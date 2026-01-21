const express = require("express");
const router = express.Router();

const c = require("../controllers/departments.controller");

// CRUD
router.get("/", c.listDepartments);        // GET  /api/departments
router.get("/:id", c.getDepartmentById);   // GET  /api/departments/:id
router.post("/", c.createDepartment);      // POST /api/departments
router.put("/:id", c.updateDepartment);    // PUT  /api/departments/:id
router.delete("/:id", c.deleteDepartment); // DELETE /api/departments/:id

module.exports = router;
