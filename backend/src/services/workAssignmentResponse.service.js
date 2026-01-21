// src/services/workAssignmentResponse.service.js
const pool = require("../config/db"); // Kết nối đến database

// Lấy tất cả các phản hồi công việc
module.exports.getAllWorkAssignmentResponses = async () => {
  const [rows] = await pool.query("SELECT * FROM WorkAssignmentResponses");
  return rows;
};

// Lấy phản hồi công việc theo workAssignmentId và employeeId
module.exports.getWorkAssignmentResponseByIds = async (workAssignmentId, employeeId) => {
  const [rows] = await pool.query("SELECT * FROM WorkAssignmentResponses WHERE workAssignmentId = ? AND employeeId = ?", [workAssignmentId, employeeId]);
  return rows;
};

// Thêm phản hồi cho công việc
module.exports.addWorkAssignmentResponse = async (data) => {
  const { workAssignmentId, employeeId, status, respondedAt, rejectReason } = data;
  const [result] = await pool.query(
    `INSERT INTO WorkAssignmentResponses (workAssignmentId, employeeId, status, respondedAt, rejectReason, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, 
    [workAssignmentId, employeeId, status, respondedAt, rejectReason]
  );
  return result.insertId;
};
