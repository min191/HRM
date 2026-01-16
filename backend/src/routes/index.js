// src/routes/index.js - Tổng hợp tất cả routes
import express from 'express';

import authRoutes from './auth.routes.js';
import employeeRoutes from './employee.routes.js';
import departmentRoutes from './department.routes.js';
import positionRoutes from './position.routes.js';
import approvalRoutes from './approval.routes.js';
import attendanceRoutes from './attendance.routes.js';
import salaryRoutes from './salary.routes.js';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Employee routes
router.use('/employees', employeeRoutes);

// Department routes
router.use('/departments', departmentRoutes);

// Position routes
router.use('/positions', positionRoutes);

// Approval routes
router.use('/approvals', approvalRoutes);

// Attendance routes
router.use('/attendance', attendanceRoutes);

// Salary routes
router.use('/salary', salaryRoutes);

// Root endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API đang hoạt động',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      employees: '/api/employees',
      departments: '/api/departments',
      positions: '/api/positions',
      approvals: '/api/approvals',
      attendance: '/api/attendance',
      salary: '/api/salary'
    }
  });
});

export default router;
