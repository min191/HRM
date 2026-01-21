// src/services/monthlySalary.service.js
const pool = require("../config/db");

module.exports = {
  // Lấy danh sách tất cả Monthly Salary
  async getAllMonthlySalaries() {
    const [rows] = await pool.query("SELECT * FROM MonthlySalary");
    return rows;
  },

  // Lấy Monthly Salary theo employeeId
  async getMonthlySalaryByEmployeeId(employeeId) {
    const [rows] = await pool.query("SELECT * FROM MonthlySalary WHERE employeeId = ?", [employeeId]);
    return rows;
  },

  // Thêm Monthly Salary mới
  async addMonthlySalary(data) {
    const {
      employeeId, month, year, employeeType, salaryGradeId, applicableRate, baseSalary,
      totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, status,
      approvedByAccountId
    } = data;

    const [result] = await pool.query(
      `
      INSERT INTO MonthlySalary
      (employeeId, month, year, employeeType, salaryGradeId, applicableRate, baseSalary, 
      totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, status, 
      approvedByAccountId, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [
        employeeId, month, year, employeeType, salaryGradeId, applicableRate, baseSalary,
        totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, status, 
        approvedByAccountId
      ]
    );

    return this.getById(result.insertId);
  },

  // Cập nhật Monthly Salary theo ID
  async updateMonthlySalary(id, data) {
    const {
      baseSalary, totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary, 
      status, approvedByAccountId
    } = data;

    const updatedAt = new Date();

    await pool.query(
      `
      UPDATE MonthlySalary
      SET baseSalary = ?, totalAllowances = ?, totalInsurance = ?, agreedSalary = ?, totalDaysWorked = ?, 
          netSalary = ?, status = ?, approvedByAccountId = ?, updated_at = ?
      WHERE id = ?
      `,
      [
        baseSalary, totalAllowances, totalInsurance, agreedSalary, totalDaysWorked, netSalary,
        status, approvedByAccountId, updatedAt, id
      ]
    );

    return this.getById(id);
  },

  // Lấy Monthly Salary theo ID
  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM MonthlySalary WHERE id = ?", [id]);
    return rows[0];
  },

  // Xóa Monthly Salary theo ID
  async deleteMonthlySalary(id) {
    const [result] = await pool.query("DELETE FROM MonthlySalary WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
};
