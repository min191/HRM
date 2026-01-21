const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

module.exports = {
  async list() {
    const [rows] = await pool.query(`
      SELECT 
        pe.employeeId,
        e.employeeCode,
        e.name AS employeeName,
        pe.salaryLevelId,
        sg.gradeName,
        pe.applicableRate,
        pe.baseSalary,
        pe.lastSalaryIncrease,
        pe.salaryIncreaseCycleMonths,
        pe.notes,
        pe.created_at,
        pe.updated_at
      FROM PermanentEmployee pe
      JOIN Employees e ON e.id = pe.employeeId
      JOIN SalaryGrades sg ON sg.id = pe.salaryLevelId
      ORDER BY e.name ASC
    `);
    return rows;
  },

  async getByEmployeeId(employeeId) {
    const [rows] = await pool.query(
      `
      SELECT 
        pe.*,
        sg.gradeName,
        e.name AS employeeName
      FROM PermanentEmployee pe
      JOIN Employees e ON e.id = pe.employeeId
      JOIN SalaryGrades sg ON sg.id = pe.salaryLevelId
      WHERE pe.employeeId = ?
      `,
      [employeeId]
    );
    return rows[0] || null;
  },

  async create(body) {
    // Check đã tồn tại chưa (1–1)
    const [exists] = await pool.query(
      "SELECT employeeId FROM PermanentEmployee WHERE employeeId = ?",
      [body.employeeId]
    );
    if (exists.length)
      throw new ApiError(409, "Permanent employee already exists");

    const now = new Date();

    await pool.query(
      `
      INSERT INTO PermanentEmployee
      (employeeId, salaryLevelId, applicableRate, baseSalary,
       lastSalaryIncrease, salaryIncreaseCycleMonths, notes,
       created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        body.employeeId,
        body.salaryLevelId,
        body.applicableRate,
        body.baseSalary ?? null,
        body.lastSalaryIncrease ?? null,
        body.salaryIncreaseCycleMonths ?? 36,
        body.notes ?? null,
        now,
        now
      ]
    );

    return this.getByEmployeeId(body.employeeId);
  },

  async update(employeeId, body) {
    const current = await this.getByEmployeeId(employeeId);
    if (!current) return null;

    const now = new Date();

    await pool.query(
      `
      UPDATE PermanentEmployee
      SET salaryLevelId = ?,
          applicableRate = ?,
          baseSalary = ?,
          lastSalaryIncrease = ?,
          salaryIncreaseCycleMonths = ?,
          notes = ?,
          updated_at = ?
      WHERE employeeId = ?
      `,
      [
        body.salaryLevelId ?? current.salaryLevelId,
        body.applicableRate ?? current.applicableRate,
        body.baseSalary ?? current.baseSalary,
        body.lastSalaryIncrease ?? current.lastSalaryIncrease,
        body.salaryIncreaseCycleMonths ?? current.salaryIncreaseCycleMonths,
        body.notes ?? current.notes,
        now,
        employeeId
      ]
    );

    return this.getByEmployeeId(employeeId);
  },

  async remove(employeeId) {
    const [result] = await pool.query(
      "DELETE FROM PermanentEmployee WHERE employeeId = ?",
      [employeeId]
    );
    return result.affectedRows > 0;
  }
};
