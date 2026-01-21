// routes/index.js
const express = require("express");
const router = express.Router();

// Import các router riêng biệt từ các file khác
router.use("/employees", require("./employees.routes"));
router.use("/salaryGrades", require("./salaryGrades.routes"));
router.use("/attendancePolicies", require("./attendancePolicy.routes"));
router.use("/departments", require("./departments.routes"));
router.use("/positions", require("./positions.routes"));
router.use("/tasks", require("./tasks.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/permissions", require("./permissions.routes"));
router.use("/permanent-employees", require("./permanentEmployees.routes"));
router.use("/contract-employees", require("./contractEmployees.routes"));
router.use("/approvals", require("./approvals.routes"));
router.use("/professional-qualifications", require("./professionalQualification.routes"));
router.use("/political-affiliations", require("./politicalAffiliation.routes"));
router.use("/familyMembers", require("./familyMembers.routes"));
router.use("/workHistories", require("./workHistory.routes"));
router.use("/workAssignments", require("./workAssignment.routes"));
router.use("/workAssignmentResponses", require("./workAssignmentResponse.routes"));
router.use("/dailyAttendance", require("./dailyAttendance.routes"));
router.use("/attendanceLogs", require("./attendanceLog.routes"));
router.use("/benefits", require("./benefits.routes"));
router.use("/monthly-attendance", require("./monthlyAttendance.routes"));
router.use("/monthly-salary", require("./monthlySalary.routes"));

module.exports = router;  // Export router để sử dụng trong app.js hoặc server.js
