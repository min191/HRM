import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PERMISSIONS } from "../../auth/permissions";
import { useAuth } from "../../auth/AuthContext";
import { getEmployeeById } from "../../services/employeeService";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userRole = user?.role;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Lấy thông tin nhân viên từ employeeService
    if (user?.id) {
      getEmployeeById(user.id).then((emp) => {
        setUserName(emp.name); // lấy tên thật
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Dynamic menu memoized
  const menu = React.useMemo(
    () => [
      {
        path: "/",
        icon: "dashboard",
        label: "Báo cáo & Thống kê",
        permissions: PERMISSIONS.DASHBOARD,
      },
      {
        path: "/employees",
        icon: "group",
        label: "Hồ sơ nhân viên",
        permissions: PERMISSIONS.EMPLOYEES,
      },
      {
        path: "/assignments",
        icon: "assignment_ind",
        label: "Phân công công việc",
        permissions: PERMISSIONS.ASSIGNMENTS_ADMIN,
      },
      {
        path: "/assignments_user",
        icon: "assignment_ind",
        label: "Phân công công việc",
        permissions: PERMISSIONS.ASSIGNMENTS_USER,
      },

      {
        path: "/approvals",
        icon: "fact_check",
        label: "Duyệt yêu cầu",
        permissions: PERMISSIONS.APPROVALS_ADMIN,
      },
      {
        path: "/approvals-employee",
        icon: "fact_check",
        label: "Yêu cầu",
        permissions: PERMISSIONS.APPROVALS_EMPLOYEE,
      },

      // ===== ACCOUNTANT =====
      {
        path: "/finance",
        icon: "account_balance",
        label: "Tổng quan tài chính",
        permissions: PERMISSIONS.FINANCE_DASHBOARD,
      },
      {
        path: "/attendance-summary",
        icon: "event_available",
        label: "Tổng hợp chấm công",
        permissions: PERMISSIONS.ATTENDANCE_SUMMARY,
      },
      {
        path: "/payroll-approval",
        icon: "payments",
        label: "Duyệt bảng lương",
        permissions: PERMISSIONS.PAYROLL_APPROVAL,
      },
      {
        path: "/tax-deduction",
        icon: "request_quote",
        label: "Thuế & Khấu trừ",
        permissions: PERMISSIONS.TAX_DEDUCTION,
      },

      // 👉 OPTIONAL – chỉ hiện nếu bạn muốn truy cập trực tiếp
      {
        path: "/salary",
        icon: "receipt_long",
        label: "Chi tiết lương",
        permissions: PERMISSIONS.SALARY_DETAIL,
      },

      {
        path: "/account-permission",
        icon: "manage_accounts",
        label: "Quản lý tài khoản & Phân quyền",
        permissions: PERMISSIONS.ACCOUNT,
      },
      {
        path: "/benefits",
        icon: "health_and_safety",
        label: "Phúc lợi & Bảo hiểm",
        permissions: PERMISSIONS.BENEFITS,
      },
      {
        path: "/notifications",
        icon: "notifications",
        label: "Thông báo & Nhắc nhở",
        permissions: PERMISSIONS.NOTIFICATIONS,
      },
    ],
    [user?.role],
  );

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-white border-r border-gray-200 h-screen fixed">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-200">
        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">corporate_fare</span>
        </div>
        <div>
          <h2 className="text-sm font-bold">Hệ thống HRM</h2>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            {userName || "Quản trị viên"}
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menu
            .filter(
              (item) =>
                !item.permissions || item.permissions.includes(userRole),
            )
            .map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                     ${isActive ? "bg-primarySoft text-primary border-r-4 border-primary font-bold" : "text-gray-700 hover:bg-gray-50"}`
                  }
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
