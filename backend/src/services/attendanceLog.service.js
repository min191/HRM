// src/services/attendanceLog.service.js
const pool = require("../config/db");

// Lấy tất cả các bản ghi chấm công
module.exports.getAllAttendanceLogs = async () => {
  const [rows] = await pool.query("SELECT * FROM AttendanceLogs");
  return rows;
};

// Lấy bản ghi chấm công của nhân viên theo ngày
module.exports.getAttendanceLogByEmployeeAndDate = async (employeeId, workDate) => {
  const [rows] = await pool.query("SELECT * FROM AttendanceLogs WHERE employeeId = ? AND workDate = ?", [employeeId, workDate]);
  return rows;
};

// Thêm một bản ghi chấm công
module.exports.addAttendanceLog = async (data) => {
  const { employeeId, workDate, checkInAt, checkOutAt, workedMinutes, status, createdByAccountId, updatedByAccountId, note } = data;
  const [result] = await pool.query(
    `INSERT INTO AttendanceLogs (employeeId, workDate, checkInAt, checkOutAt, workedMinutes, status, createdByAccountId, updatedByAccountId, note, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, 
    [employeeId, workDate, checkInAt, checkOutAt, workedMinutes, status, createdByAccountId, updatedByAccountId, note]
  );
  return result.insertId;
};

// Cập nhật một bản ghi chấm công
module.exports.updateAttendanceLog = async (id, data) => {
  const { checkOutAt, workedMinutes, status, updatedByAccountId, note } = data;
  const [result] = await pool.query(
    `UPDATE AttendanceLogs SET checkOutAt = ?, workedMinutes = ?, status = ?, updatedByAccountId = ?, note = ?, updated_at = NOW() WHERE id = ?`,
    [checkOutAt, workedMinutes, status, updatedByAccountId, note, id]
  );
  return result.affectedRows > 0;
};
