import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { PERMISSIONS } from "./auth/permissions";
import { LayoutProvider } from "./layouts/LayoutContext";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/LoginPages/Login";
import Unauthorized from "./pages/LoginPages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/EmployeesPages/Employees";
import EmployeesDetail from "./pages/EmployeesPages/EmployeesDetail";
import Assignment from "./pages/Assignment";
import Reports from "./pages/Reports";
import Approvals from "./pages/Approvals";
import ApprovalsEmployee from "./pages/ApprovalsEmployee";
import AccountPermission from "./pages/AccountPermission";
import BenefitsInsurance from "./pages/BenefitsInsurance";
import Notifications from "./pages/Notifications";

import AttendanceSummary from "./pages/AccountantPages/AttendanceSummary";
import FinanceDashboard from "./pages/AccountantPages/FinanceDashboard";
import PayrollApprovalPage from "./pages/AccountantPages/PayrollApprovalPage";
import PayrollDetail from "./pages/AccountantPages/PayrollDetail";
import TaxAndDeduction from "./pages/AccountantPages/TaxAndDeduction";

export default function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <BrowserRouter>
          <Routes>

            {/* ===== PUBLIC ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* ===== AUTH REQUIRED ===== */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>

                {/* ===== CORE ===== */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.DASHBOARD}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employees"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.EMPLOYEES}>
                      <Employees />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employees/:id"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.EMPLOYEE_DETAIL}>
                      <EmployeesDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/assignments"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.ASSIGNMENTS}>
                      <Assignment />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.REPORTS}>
                      <Reports />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/approvals"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.APPROVALS}>
                      <Approvals />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/approvals-employee"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.APPROVALS_EMPLOYEE}>
                      <ApprovalsEmployee />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/account-permission"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.ACCOUNT}>
                      <AccountPermission />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/benefits"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.BENEFITS}>
                      <BenefitsInsurance />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.NOTIFICATIONS}>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />

                {/* ===== ACCOUNTANT (FIXED) ===== */}
                <Route
                  path="/finance"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.FINANCE_DASHBOARD}>
                      <FinanceDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/attendance-summary"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.ATTENDANCE_SUMMARY}>
                      <AttendanceSummary />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/payroll-approval"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.PAYROLL_APPROVAL}>
                      <PayrollApprovalPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/payroll/:id"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.PAYROLL_DETAIL}>
                      <PayrollDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tax-deduction"
                  element={
                    <ProtectedRoute roles={PERMISSIONS.TAX_DEDUCTION}>
                      <TaxAndDeduction />
                    </ProtectedRoute>
                  }
                />

              </Route>
            </Route>

            {/* ===== FALLBACK ===== */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </AuthProvider>
  );
}
