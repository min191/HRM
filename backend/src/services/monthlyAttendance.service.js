// src/services/monthlyAttendance.service.js
const pool = require("../config/db");

// Lấy tất cả các bản ghi Monthly Attendance
module.exports.getAllMonthlyAttendance = async () => {
  const [rows] = await pool.query("SELECT * FROM MonthlyAttendance");
  return rows;
};

// Lấy Monthly Attendance của nhân viên theo employeeId
module.exports.getMonthlyAttendanceByEmployeeId = async (employeeId) => {
  const [rows] = await pool.query("SELECT * FROM MonthlyAttendance WHERE employeeId = ?", [employeeId]);
  return rows;
};

// Thêm một bản ghi Monthly Attendance
module.exports.addMonthlyAttendance = async (data) => {
  const { employeeId, month, year, totalDaysWorked, status, submittedByAccountId } = data;
  const [result] = await pool.query(
    `INSERT INTO MonthlyAttendance
      (employeeId, month, year, totalDaysWorked, status, submittedByAccountId, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [employeeId, month, year, totalDaysWorked, status, submittedByAccountId]
  );
  return result.insertId;
};

// Cập nhật một bản ghi Monthly Attendance
module.exports.updateMonthlyAttendance = async (id, data) => {
  const { totalDaysWorked, status, submittedByAccountId, approvedByAccountId, rejectReason } = data;
  const updatedAt = new Date();
  await pool.query(
    `UPDATE MonthlyAttendance
      SET totalDaysWorked = ?, status = ?, submittedByAccountId = ?, approvedByAccountId = ?, rejectReason = ?, updated_at = ?
      WHERE id = ?`,
    [totalDaysWorked, status, submittedByAccountId, approvedByAccountId, rejectReason, updatedAt, id]
  );
  return this.getById(id);
};

// Xóa một bản ghi Monthly Attendance
module.exports.removeMonthlyAttendance = async (id) => {
  const [result] = await pool.query("DELETE FROM MonthlyAttendance WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
