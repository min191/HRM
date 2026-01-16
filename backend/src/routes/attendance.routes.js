import express from 'express';
import * as controller from '../controllers/attendance.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/role.js';

const router = express.Router();
router.use(authenticate);

router.post('/', authorize('ACCOUNTANT'), controller.markAttendance);
router.get(
  '/monthly/:employeeId',
  authorize('ADMIN','ACCOUNTANT'),
  controller.getMonthlyAttendance
);

export default router;
