// src/services/workHistory.service.js
const pool = require("../config/db"); // Kết nối cơ sở dữ liệu

// Lấy tất cả lịch sử công tác
module.exports.getAllWorkHistories = async () => {
  const [rows] = await pool.query("SELECT * FROM WorkHistory");
  return rows;
};

// Lấy lịch sử công tác theo employeeId
module.exports.getWorkHistoryByEmployeeId = async (employeeId) => {
  const [rows] = await pool.query("SELECT * FROM WorkHistory WHERE employeeId = ?", [employeeId]);
  return rows;
};

// Thêm mới lịch sử công tác
module.exports.addWorkHistory = async (data) => {
  const { employeeId, departmentId, positionId, eventType, effectiveDate, endDate, decisionNumber, content } = data;
  const [result] = await pool.query(
    `INSERT INTO WorkHistory (employeeId, departmentId, positionId, eventType, effectiveDate, endDate, decisionNumber, content, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, 
    [employeeId, departmentId, positionId, eventType, effectiveDate, endDate, decisionNumber, content]
  );
  return result.insertId;
};
