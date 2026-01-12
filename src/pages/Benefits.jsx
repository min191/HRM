import React from "react";

export default function BenefitsInsurance() {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-display text-slate-900">
      

      {/* ========== MAIN ========== */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto p-8 space-y-6">
          {/* FILTER */}
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-textMuted uppercase">
                  Tìm nhân viên
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Mã NV hoặc Họ tên..."
                />
              </div>

              <select className="px-4 py-2.5 border border-border rounded-lg text-sm">
                <option>Tất cả bảo hiểm</option>
                <option>BHXH</option>
                <option>BHYT</option>
                <option>BHTN</option>
              </select>

              <select className="px-4 py-2.5 border border-border rounded-lg text-sm">
                <option>Tất cả phúc lợi</option>
                <option>Nghỉ mát</option>
                <option>Thưởng lễ</option>
              </select>

              <button className="bg-slate-100 hover:bg-slate-200 py-2.5 rounded-lg text-sm font-bold">
                Làm mới
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-border">
                <tr>
                  {[
                    "Mã NV",
                    "Họ tên",
                    "Loại chế độ",
                    "Mức hưởng","Ngày bắt đầu",
                    "Trạng thái",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-xs font-bold text-textMuted uppercase text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-primary">NV001</td>
                  <td className="px-6 py-4 font-semibold">Nguyễn Văn An</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">
                      BHXH
                    </span>
                  </td>
                  <td className="px-6 py-4">8%</td>
                  <td className="px-6 py-4 text-textMuted">01/01/2023</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold text-xs">
                    Đang đóng
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* INSIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ["health_and_safety", "BHXH đang tham gia", "142"],
              ["card_giftcard", "Phúc lợi tháng này", "28"],
              ["request_quote", "Tổng chi trả", "345M"],
            ].map(([icon, label, value]) => (
              <div
                key={label}
                className="bg-white p-6 rounded-xl border border-border flex items-center gap-5"
              >
                <div className="size-12 rounded-full bg-primarySoft text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-textMuted uppercase">
                    {label}
                  </p>
                  <p className="text-2xl font-black">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}