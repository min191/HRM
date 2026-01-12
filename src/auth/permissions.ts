// auth/permissions.js
import { ROLES } from "./roles";

export const PERMISSIONS = {
  DASHBOARD: [
    ROLES.ADMIN,
    ROLES.HR,
    ROLES.KETOAN,
    ROLES.NHANVIEN,
  ],

  EMPLOYEES: [
    ROLES.ADMIN,
    ROLES.HR,
  ],

  EMPLOYEE_DETAIL: [
    ROLES.ADMIN,
    ROLES.HR,
  ],

  ASSIGNMENTS: [
    ROLES.ADMIN,
    ROLES.HR,
    ROLES.KETOAN,
  ],

  REPORTS: [
    ROLES.ADMIN,
    ROLES.KETOAN,
  ],

  APPROVALS: [
    ROLES.ADMIN,
    ROLES.HR,
  ],
  APPROVALS_EMPLOYEE: [
    ROLES.KETOAN,
    ROLES.NHANVIEN,
    ROLES.HR,
  ],

  ACCOUNT: [
    ROLES.ADMIN,
  ],

  BENEFITS: [
    ROLES.ADMIN,
    ROLES.HR,
  ],

  NOTIFICATIONS: [
    ROLES.ADMIN,
    ROLES.HR,
    ROLES.NHANVIEN,
  ],

};
