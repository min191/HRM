import React from 'react';

import ReportsDataTable from "../components/Reports/ReportsDataTable";
import ReportsSearchInput from "../components/Reports/ReportsSearchInput";
import ReportsStatCard from "../components/Reports/ReportsStatCard";

export default function Reports() {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 font-display text-[#101818]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-primary">Trung tâm dữ liệu nhân sự</h2>
        <ReportsSearchInput placeholder="Tìm kiếm nhân viên, báo cáo..." />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-primary">Báo cáo & Thống kê</h1>
          <p className="text-gray-500">
            Xem và xuất các báo cáo nhân sự, lương thưởng và chấm công.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportsStatCard title="Tổng nhân sự" value="142" />
          <ReportsStatCard title="Tổng quỹ lương" value="2.4 tỷ" />
          <ReportsStatCard title="Tỷ lệ đi làm" value="98%" />
          <ReportsStatCard title="Cần chú ý" value="5 hợp đồng" />
        </div>

        {/* Table */}
        <ReportsDataTable />
      </main>
    </div>
  );
}
