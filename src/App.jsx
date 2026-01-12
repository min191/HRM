import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { PERMISSIONS } from "./auth/permissions";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/LoginPages/Login";
import Unauthorized from "./pages/LoginPages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";

import Assignment from "./pages/Assignment";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/EmployeesPages/Employees";
import EmployeesDetail from "./pages/EmployeesPages/EmployeesDetail";

// Các page còn lại
import AccountPermission from "./pages/AccountPermission";
import Approvals from "./pages/Approvals";
import Benefits from "./pages/Benefits";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import ApprovalsEmployee from "./pages/ApprovalsEmployee";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ===== PUBLIC ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ===== LOGIN REQUIRED ===== */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>

              {/* Dashboard */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.DASHBOARD} />}
              >
                <Route path="/" element={<Dashboard />} />
              </Route>

              {/* Employees */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.EMPLOYEES} />}
              >
                <Route path="/employees" element={<Employees />} />
              </Route>

              <Route
                element={<ProtectedRoute roles={PERMISSIONS.EMPLOYEE_DETAIL} />}
              >
                <Route path="/employees/:id" element={<EmployeesDetail />} />
              </Route>

              {/* Assignments */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.ASSIGNMENTS} />}
              >
                <Route path="/assignments" element={<Assignment />} />
              </Route>

              {/* Reports */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.REPORTS} />}
              >
                <Route path="/reports" element={<Reports />} />
              </Route>

              {/* Approvals */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.APPROVALS} />}
              >
                <Route path="/approvals" element={<Approvals />} />
              </Route>

              {/* Approvals of Employee */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.APPROVALS_EMPLOYEE} />}
              >
                <Route path="/ApprovalsEmployee" element={<ApprovalsEmployee />} />
              </Route>

              {/* AccountPermission */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.ACCOUNT} />}
              >
                <Route path="/AccountPermission" element={<AccountPermission />} />
              </Route>

              {/* Benefits */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.BENEFITS} />}
              >
                <Route path="/benefits" element={<Benefits />} />
              </Route>

              {/* Notifications */}
              <Route
                element={<ProtectedRoute roles={PERMISSIONS.NOTIFICATIONS} />}
              >
                <Route path="/notifications" element={<Notifications />} />
              </Route>
            </Route>
          </Route>

          {/* ===== FALLBACK ===== */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
