// src/services/benefits.service.js
const pool = require("../config/db");

// Lấy tất cả các bản ghi Benefit
module.exports.getAllBenefits = async () => {
  const [rows] = await pool.query("SELECT * FROM Benefits");
  return rows;
};

// Lấy Benefit của nhân viên theo employeeId
module.exports.getBenefitsByEmployeeId = async (employeeId) => {
  const [rows] = await pool.query("SELECT * FROM Benefits WHERE employeeId = ?", [employeeId]);
  return rows;
};

// Thêm một bản ghi Benefit
module.exports.addBenefit = async (data) => {
  const { employeeId, type, name, value, startDate, endDate, notes, calcType, applyByAttendance } = data;
  const [result] = await pool.query(
    `INSERT INTO Benefits
      (employeeId, type, name, value, startDate, endDate, notes, calcType, applyByAttendance, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [employeeId, type, name, value, startDate, endDate, notes, calcType, applyByAttendance]
  );
  return result.insertId;
};

// Cập nhật một bản ghi Benefit
module.exports.updateBenefit = async (id, data) => {
  const { type, name, value, startDate, endDate, notes, calcType, applyByAttendance } = data;
  const [result] = await pool.query(
    `UPDATE Benefits SET type = ?, name = ?, value = ?, startDate = ?, endDate = ?, notes = ?, calcType = ?, applyByAttendance = ?, updated_at = NOW() WHERE id = ?`,
    [type, name, value, startDate, endDate, notes, calcType, applyByAttendance, id]
  );
  return result.affectedRows > 0;
};

// Xóa một bản ghi Benefit
module.exports.removeBenefit = async (id) => {
  const [result] = await pool.query("DELETE FROM Benefits WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
