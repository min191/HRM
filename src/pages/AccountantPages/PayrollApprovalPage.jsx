import React from "react";

export default function PayrollApprovalPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light font-display">
      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

          {/* KPI cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <KPI title="Tổng quỹ lương (Gross)" value="2,500,000,000 ₫" />
            <KPI title="Tổng thuế TNCN" value="150,000,000 ₫" />
            <KPI title="BHXH / BHYT" value="210,000,000 ₫" />
            <KPI
              title="Thực lĩnh (Net Pay)"
              value="2,140,000,000 ₫"
              primary
            />
          </section>

          {/* Table */}
          <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left font-semibold">
                      Mã NV
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Họ tên
                    </th>
                    <th className="px-6 py-4 text-right font-semibold bg-primary/5 text-primary">
                      Thực lĩnh
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  <tr className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-500">
                      NV001
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      Nguyễn Văn A
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-primary bg-primary/5 tabular-nums">
                      15,125,000 ₫
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Action bar */}
          <div
            className="
              sticky bottom-4
              bg-white border border-border
              px-4 sm:px-6 py-4
              rounded-2xl
              flex flex-col sm:flex-row
              gap-4 sm:gap-0
              justify-between items-start sm:items-center
              shadow-md
            "
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600">
                verified_user
              </span>
              <p className="text-sm font-semibold text-slate-700">
                Hệ thống đã kiểm tra tự động
              </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                className="
                  flex-1 sm:flex-none
                  px-6 h-11 rounded-xl
                  border border-red-200
                  text-red-600 font-semibold
                  transition
                  hover:bg-red-50
                "
              >
                Yêu cầu chỉnh sửa
              </button>

              <button
                className="
                  flex-1 sm:flex-none
                  px-6 h-11 rounded-xl
                  bg-primary text-white font-semibold
                  transition
                  hover:bg-primary/90
                  hover:shadow-lg
                "
              >
                Phê duyệt &amp; Trình Giám đốc
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* ================= KPI ================= */

function KPI({ title, value, primary }) {
  return (
    <div
      className={`
        relative p-6 rounded-2xl border
        bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        ${
          primary
            ? "border-primary/30 bg-primary/5"
            : "border-border"
        }
      `}
    >
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
        {title}
      </p>

      <p
        className={`
          mt-2 text-3xl font-extrabold tabular-nums
          ${primary ? "text-primary" : "text-slate-900"}
        `}
      >
        {value}
      </p>
    </div>
  );
}
