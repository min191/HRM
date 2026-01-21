// src/services/dailyAttendance.service.js
const pool = require("../config/db"); // Kết nối đến database

// Lấy tất cả các bản ghi chấm công hàng ngày
module.exports.getAllDailyAttendance = async () => {
  const [rows] = await pool.query("SELECT * FROM DailyAttendance");
  return rows;
};

// Lấy bản ghi chấm công của nhân viên theo ngày
module.exports.getDailyAttendanceByEmployeeAndDate = async (employeeId, date) => {
  const [rows] = await pool.query("SELECT * FROM DailyAttendance WHERE employeeId = ? AND date = ?", [employeeId, date]);
  return rows;
};

// Thêm bản ghi chấm công cho nhân viên
module.exports.addDailyAttendance = async (data) => {
  const { employeeId, date, status, hoursWorked, notes, createdByAccountId, updatedByAccountId } = data;
  const [result] = await pool.query(
    `INSERT INTO DailyAttendance (employeeId, date, status, hoursWorked, notes, createdByAccountId, updatedByAccountId, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, 
    [employeeId, date, status, hoursWorked, notes, createdByAccountId, updatedByAccountId]
  );
  return result.insertId;
};

// Cập nhật bản ghi chấm công
module.exports.updateDailyAttendance = async (id, data) => {
  const { status, hoursWorked, notes, updatedByAccountId } = data;
  const [result] = await pool.query(
    `UPDATE DailyAttendance SET status = ?, hoursWorked = ?, notes = ?, updatedByAccountId = ?, updated_at = NOW() WHERE id = ?`,
    [status, hoursWorked, notes, updatedByAccountId, id]
  );
  return result.affectedRows > 0;
};
