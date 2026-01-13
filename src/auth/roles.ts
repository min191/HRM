export const ROLES = {
  ADMIN: "admin",
  HR: "HR",
  KETOAN: "ketoan",
  NHANVIEN: "nhanvien",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
