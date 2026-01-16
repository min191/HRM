import React from "react";

export default function FinanceDashboard() {
  return (
    <div className="font-display">
      <div className="flex min-h-screen w-full bg-background-light text-slate-800">
        {/* ================= MAIN ================= */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <Stat
                title="Quỹ lương thực chi (Tháng 6)"
                value="1.250.000.000 ₫"
                icon="account_balance_wallet"
                color="text-primary"
              />
              <Stat
                title="Bảng lương chờ duyệt"
                value="3"
                icon="pending_actions"
                color="text-orange-500"
              />
              <Stat
                title="Thuế TNCN tạm tính"
                value="85.000.000 ₫"
                icon="receipt"
                color="text-blue-500"
              />
            </div>

            {/* PAYROLL LIST */}
            <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-bold text-slate-900">
                  Duyệt bảng lương
                </h3>
                <p className="text-sm text-slate-500">
                  Danh sách bảng lương theo phòng ban
                </p>
              </div>

              <div className="p-4 space-y-3">
                <PayrollItem
                  dept="Marketing"
                  amount="450.000.000 ₫"
                />
                <PayrollItem
                  dept="Kinh doanh"
                  amount="820.000.000 ₫"
                />
                <PayrollItem
                  dept="Kỹ thuật"
                  done
                />
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

/* ================= COMPONENT PHỤ ================= */

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

function PayrollItem({ dept, amount, done }) {
  return (
    <div
      className={`
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        gap-3 rounded-xl border px-4 py-3
        transition-all duration-200
        ${done
          ? "bg-slate-50 opacity-70"
          : "bg-white hover:bg-slate-50 hover:shadow-sm hover:border-primary/30"}
      `}
    >
      <div>
        <p className="font-semibold text-slate-900">
          Tháng 5 – {dept}
        </p>
        <p className="text-xs text-slate-500">
          {done ? "Đã duyệt" : "Chờ duyệt"}
        </p>
      </div>

      {!done ? (
        <div className="text-left sm:text-right">
          <p className="text-sm font-semibold text-slate-900 tabular-nums">
            {amount}
          </p>
          <button
            className="
              mt-1 inline-flex items-center gap-1
              px-3 py-1 rounded-lg
              bg-primary text-white text-xs font-semibold
              transition hover:bg-primary/90 hover:scale-[1.02]
            "
          >
            Chi tiết
            <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
          </button>
        </div>
      ) : (
        <span className="text-xs font-semibold text-green-600">
          ✔ Hoàn tất
        </span>
      )}
    </div>
  );
}
