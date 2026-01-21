const express = require("express");
const router = express.Router();

const c = require("../controllers/salaryGrades.controller");

// CRUD
router.get("/", c.listSalaryGrades);        // GET /api/salary-grades
router.get("/:id", c.getSalaryGradeById);   // GET /api/salary-grades/:id
router.post("/", c.createSalaryGrade);      // POST /api/salary-grades
router.put("/:id", c.updateSalaryGrade);    // PUT /api/salary-grades/:id
router.delete("/:id", c.deleteSalaryGrade); // DELETE /api/salary-grades/:id

module.exports = router;
