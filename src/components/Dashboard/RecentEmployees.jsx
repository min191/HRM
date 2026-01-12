import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";

const isWithinLastMonth = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  const startDate = new Date(dateString);
  const diffDays = (today - startDate) / (1000 * 60 * 60 * 24);
  return diffDays <= 30;
};

export default function RecentEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployees().then((data) => {
      const recentEmployees = data.filter((e) => isWithinLastMonth(e.startDate));
      setEmployees(recentEmployees);
      setLoading(false);
    });
  }, []);

  return (
    <div className="border rounded bg-white shadow flex flex-col h-full min-h-0">
      {/* Header nội bộ */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm sm:text-base font-bold text-gray-900">Nhân viên mới (30 ngày)</h2>
        <button className="text-primary text-sm sm:text-base font-medium hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="p-3 text-sm text-slate-500">Đang tải dữ liệu...</p>
        ) : employees.length === 0 ? (
          <p className="p-3 text-sm text-slate-500">Không có nhân viên mới trong tháng</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primarySoft text-primary text-left">
              <tr>
                <th className="px-3 py-2">Mã NV</th>
                <th className="px-3 py-2">Họ tên</th>
                <th className="px-3 py-2">Phòng ban</th>
                <th className="px-3 py-2">Ngày vào</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.map((e) => (
                <tr key={e.id} className="hover:bg-primarySoft/30 transition">
                  <td className="px-3 py-2 font-medium">{e.employeeCode}</td>
                  <td className="px-3 py-2">{e.name}</td>
                  <td className="px-3 py-2 text-slate-500">{e.department}</td>
                  <td className="px-3 py-2 text-slate-500">{e.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
