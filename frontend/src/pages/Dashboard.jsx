import React, { useEffect, useState } from "react";
import EmployeesPopup from "../components/Popup/EmployeesPopup";
import { getEmployees } from "../services/employeeService";
import RecentEmployees from "../components/Dashboard/RecentEmployees";
import UpcomingEvents from "../components/Dashboard/UpcomingEvents";

import ReportsStatCard from "../components/Reports/ReportsStatCard";
import { useAuth } from "../auth/AuthContext";
import Action from "../components/common/Action";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    newEmployees: 0,
    resignedEmployees: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  // user.role: "ADMIN" | "HR" | "KETOAN" | "NHANVIEN"
  const role = user?.role?.toUpperCase();
  const isHRorAdmin = role === "ADMIN" || role === "HR";

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const employees = await getEmployees();

        const totalEmployees = employees.length;

        const newEmployees = employees.filter(
          (e) =>
            new Date(e.startDate).getFullYear() === new Date().getFullYear()
        ).length;

        const resignedEmployees = employees.filter(
          (e) => e.workStatus !== "Đang làm việc"
        ).length;

        const pendingRequests = 5; // giả lập

        setStats({
          totalEmployees,
          newEmployees,
          resignedEmployees,
          pendingRequests,
        });
      } catch (error) {
        console.error("Lỗi load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full bg-gray-50 p-4 flex flex-col gap-4">
      {/* ================= STATS ================= */}
      <div
        className={`grid gap-4 ${
          isHRorAdmin
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {loading ? (
          <p className="text-sm text-slate-500 col-span-full text-center">
            Đang tải thống kê...
          </p>
        ) : (
          <>
            <ReportsStatCard
              title="Tổng nhân sự"
              value={stats.totalEmployees}
            />

            <ReportsStatCard
              title="Nhân viên mới"
              value={stats.newEmployees}
              highlight
            />

            {isHRorAdmin && (
              <>
                <ReportsStatCard
                  title="Đã nghỉ việc"
                  value={stats.resignedEmployees}
                />
                <ReportsStatCard
                  title="Đang chờ duyệt"
                  value={stats.pendingRequests}
                />
              </>
            )}
          </>
        )}
      </div>

      {/* ================= TABLES ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1 min-h-0">
        <RecentEmployees />
        <UpcomingEvents />
      </div>

      {/* ================= ACTIONS ================= */}
      <div
        className={`grid gap-4 ${isHRorAdmin ? "grid-cols-3" : "grid-cols-2"}`}
      >
        {isHRorAdmin && (
          <Action
            icon="person_add"
            label="Thêm nhân viên"
            onClick={() => setOpenModal(true)}
          />
        )}

        <Action icon="description" label="Xuất báo cáo PDF" />
        <Action icon="mail" label="Gửi thông báo" />
      </div>

      {/* ================= POPUP ================= */}
      {openModal && <EmployeesPopup onClose={() => setOpenModal(false)} />}
    </div>
  );
}
