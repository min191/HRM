import pool from '../config/db.js';

export const calculate = async (employeeId, month, year) => {
  const [[attendance]] = await pool.query(
    'SELECT totalDaysWorked FROM monthlyattendance WHERE employeeId=? AND month=? AND year=?',
    [employeeId, month, year]
  );

  const [[salary]] = await pool.query(
    'SELECT baseSalary FROM permanentemployee WHERE employeeId=?',
    [employeeId]
  );

  const netSalary = attendance.totalDaysWorked * salary.baseSalary;

  await pool.query(
    'INSERT INTO monthlysalary (employeeId, month, year, netSalary) VALUES (?, ?, ?, ?)',
    [employeeId, month, year, netSalary]
  );

  return { netSalary };
};
