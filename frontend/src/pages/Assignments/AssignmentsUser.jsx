import React from "react";
export default function AssignmentsUser() {
  return (
    <div className="bg-slate-50 text-slate-800 h-screen overflow-hidden font-sans">
      <div className="flex h-full overflow-hidden">
        {/* MAIN */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* STATS */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">new_releases</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">
                      Công việc mới
                    </p>
                    <h3 className="text-2xl font-bold">5</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">pending_actions</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">
                      Đang thực hiện
                    </p>
                    <h3 className="text-2xl font-bold">3</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">
                      Hoàn thành (Tháng)
                    </p>
                    <h3 className="text-2xl font-bold">12</h3>
                  </div>
                </div>
              </div>

              {/* TASK LIST */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between">
                  <h4 className="font-bold">Danh sách công việc</h4>
                </div>

                <div className="divide-y">
                  <div className="p-6 flex justify-between hover:bg-slate-50">
                    <h5 className="font-bold">
                      Thiết kế Layout trang chủ HRM Mobile
                    </h5>
                    <button className="px-5 py-2 text-sm font-bold bg-teal-600 text-white rounded-lg">
                      NHẬN VIỆC
                    </button>
                  </div>

                  <div className="p-6 flex justify-between hover:bg-slate-50">
                    <h5 className="font-bold">
                      Fix lỗi hiển thị bảng lương trên Safari
                    </h5>
                    <button className="px-5 py-2 text-sm font-bold border border-teal-600 text-teal-600 rounded-lg">
                      CẬP NHẬT
                    </button>
                  </div>

                  <div className="p-6 flex justify-between hover:bg-slate-50 opacity-70">
                    <h5 className="font-bold line-through">
                      Tối ưu hóa Database SQL Q4
                    </h5>
                    <button className="px-5 py-2 text-sm font-bold bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed">
                      ĐÃ XONG
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
