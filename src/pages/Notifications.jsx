import React from "react";

export default function NotificationsCenter() {
  return (
    <div className="flex h-screen w-full bg-background-light text-[#101818] font-display overflow-hidden">
      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-8 bg-surface-light border-b border-gray-200 shrink-0">
          <h2 className="text-xl font-bold">Trung tâm thông báo</h2>

          <div className="flex items-center gap-4">
            <input
              className="w-64 pl-4 pr-3 py-2 rounded-lg bg-background-light text-sm focus:ring-2 focus:ring-primary"
              placeholder="Tìm kiếm thông báo..."
            />
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-background-light text-[#5e8d8d]">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">
            {/* NOTIFICATIONS */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex bg-white border rounded-lg p-1">
                  <button className="px-4 py-2 text-sm font-bold bg-primary/10 text-primary rounded-md">
                    Tất cả
                  </button>
                  <button className="px-4 py-2 text-sm text-[#5e8d8d]">
                    Cần xử lý
                  </button>
                  <button className="px-4 py-2 text-sm text-[#5e8d8d]">
                    Sự kiện
                  </button>
                  <button className="px-4 py-2 text-sm text-[#5e8d8d]">
                    Hệ thống
                  </button>
                </div>

                <button className="text-sm font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    done_all
                  </span>
                  Đánh dấu đã đọc tất cả
                </button>
              </div>

              {/* CARD */}
              <div className="bg-white p-5 rounded-xl border-l-4 border-red-500 shadow-sm">
                <h3 className="font-bold mb-1">
                  Cảnh báo: Yêu cầu nghỉ phép quá hạn
                </h3>
                <p className="text-sm text-gray-600 mb-3">Yêu cầu nghỉ phép của{" "}
                  <strong>Nguyễn Văn A</strong> đã chờ duyệt quá 48 giờ.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold">
                    Duyệt ngay
                  </button>
                  <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold">
                    Xem chi tiết
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border shadow-sm opacity-80">
                <h3 className="font-bold mb-1">Sinh nhật nhân viên hôm nay</h3>
                <p className="text-sm text-gray-600">
                  Chúc mừng sinh nhật <strong>Phạm Minh C</strong> 🎉
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-4 border-b font-bold">
                  Sự kiện sắp tới
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <p>
                    <strong>15/11</strong> – Review lương
                  </p>
                  <p>
                    <strong>18/11</strong> – Sinh nhật CEO
                  </p>
                </div>
              </div>

              <div className="bg-primary text-white rounded-xl p-5">
                <h3 className="font-bold mb-2">Cài đặt thông báo</h3>
                <button className="w-full bg-white text-primary py-2 rounded-lg font-bold text-sm">
                  Quản lý chi tiết
                </button>
              </div>
            </div>
          </div>

          <footer className="text-center text-sm text-[#5e8d8d] mt-12 border-t pt-6">
            © 2023 HR Portal System. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  );
}