import express from 'express';
import * as controller from '../controllers/salary.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/role.js';

const router = express.Router();
router.use(authenticate);

router.post(
  '/calculate/:employeeId',
  authorize('ACCOUNTANT'),
  controller.calculateMonthlySalary
);

export default router;
