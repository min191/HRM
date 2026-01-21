// src/services/workAssignment.service.js
const pool = require("../config/db"); // Kết nối đến database

// Lấy tất cả công việc đã phân công
module.exports.getAllWorkAssignments = async () => {
  const [rows] = await pool.query("SELECT * FROM WorkAssignments");
  return rows;
};

// Lấy công việc theo employeeId
module.exports.getWorkAssignmentByEmployeeId = async (employeeId) => {
  const [rows] = await pool.query("SELECT * FROM WorkAssignments WHERE employeeId = ?", [employeeId]);
  return rows;
};

// Thêm một công việc mới
module.exports.addWorkAssignment = async (data) => {
  const { employeeId, departmentId, positionId, taskName, assignedDate, deadline, status, notes, assignedByAccountId } = data;
  const [result] = await pool.query(
    `INSERT INTO WorkAssignments (employeeId, departmentId, positionId, taskName, assignedDate, deadline, status, notes, assignedByAccountId, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, 
    [employeeId, departmentId, positionId, taskName, assignedDate, deadline, status, notes, assignedByAccountId]
  );
  return result.insertId;
};
