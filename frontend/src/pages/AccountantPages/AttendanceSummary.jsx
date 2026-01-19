import React from "react";

export default function AttendanceSummary() {
  return (
    <div className="light font-display h-screen flex overflow-hidden bg-background-light text-[#111718]">
      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat title="Tổng nhân sự" value="124" icon="groups" />
              <Stat title="Công chuẩn tháng" value="22" icon="calendar_month" />
              <Stat title="Tổng giờ OT" value="45h" icon="av_timer" />
              <Stat
                title="Cần rà soát"
                value="3"
                icon="pending_actions"
                danger
              />
            </div>

            {/* TABLE */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">Nhân viên</th>
                    <th className="px-6 py-4 text-center">Công chuẩn</th>
                    <th className="px-6 py-4 text-center">
                      Thực tế
                    </th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <Row name="Nguyễn Văn A" code="#EMP001" actual="22" />
                  <Row name="Lê Thị B" code="#EMP024" actual="21.5" />
                  <Row
                    name="Trần Văn C"
                    code="#EMP045"
                    actual="20"
                    warning
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Stat({ title, value, icon, color }) {
  return (
    <div
      className="
        relative bg-white p-6 rounded-2xl
        border border-border shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* ICON NỔI (RÕ MÀU) */}
      <div
        className={`
          absolute right-5 top-5
          w-12 h-12 rounded-xl
          flex items-center justify-center
          ${color} bg-current/10
          transition
          group-hover:bg-current/20
        `}
      >
        <span className="material-symbols-outlined text-[26px]">
          {icon}
        </span>
      </div>

      {/* ICON WATERMARK */}
      <span
        className={`
          material-symbols-outlined
          absolute right-2 bottom-2
          text-[96px] opacity-[0.06]
          ${color}
          pointer-events-none
        `}
      >
        {icon}
      </span>

      <p className="text-sm text-slate-500 pr-16">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-bold text-slate-900 tabular-nums">
        {value}
      </h3>
    </div>
  );
}


function Row({ name, code, actual, warning }) {
  return (
    <tr
      className={`border-t ${
        warning ? "bg-orange-50/40" : "hover:bg-gray-50"
      }`}
    >
      <td className="px-6 py-4">
        <div className="font-bold">{name}</div>
        <div className="text-xs text-gray-500">{code}</div>
      </td>
      <td className="px-6 py-4 text-center">22</td>
      <td
        className={`px-6 py-4 text-center font-bold ${
          warning ? "text-orange-600" : ""
        }`}
      >
        {actual}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-gray-400 hover:text-primary">
          <span className="material-symbols-outlined text-[20px]">
            visibility
          </span>
        </button>
      </td>
    </tr>
  );
}
