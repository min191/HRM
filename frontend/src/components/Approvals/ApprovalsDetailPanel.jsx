// components/Approvals/ApprovalsDetailPanel.jsx
import React, { useState } from "react";

export default function ApprovalsDetailPanel({ request, onClose, onApprove, onReject }) {
  const [rejectReason, setRejectReason] = useState("");

  if (!request) return null;

  const { employee = {}, type, startDate, endDate, reason, duration, status, history = [] } = request;

  const handleRejectClick = () => {
    onReject?.(request.id, rejectReason);
    setRejectReason("");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300
          ${request ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[380px] bg-white
          border-l border-gray-200 shadow-xl
          transform transition-transform duration-300 flex flex-col
          ${request ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
          <h3 className="font-bold text-base">Chi tiết yêu cầu</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-primary transition">✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* User info */}
          <div className="flex items-center gap-3">
            <img
              src={employee?.avatar || "https://i.pravatar.cc/80"}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{employee?.name}</p>
              <p className="text-gray-500 text-xs">{employee?.department}</p>
              <p className="text-gray-500 text-xs">ID: {employee?.id}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-100 px-3 py-2">
              <p className="text-xs text-gray-500">Loại yêu cầu</p>
              <p className="font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {type}
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 px-3 py-2">
              <p className="text-xs text-gray-500">Thời gian</p>
              <p className="font-bold">{duration}</p>
            </div>
          </div>

          {/* Detail */}
          <div className="space-y-3">
            <h4 className="font-bold">Thông tin chi tiết</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500">Bắt đầu</p>
                <p className="font-medium">{startDate}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500">Kết thúc</p>
                <p className="font-medium">{endDate}</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-3 text-xs">
              <p className="text-gray-500 mb-1">Lý do</p>
              <p>{reason}</p>
            </div>
          </div>

          {/* History */}
          <div className="space-y-2">
            <h4 className="font-bold">Lịch sử</h4>
            <div className="text-xs text-gray-500 space-y-1">
              {history.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="w-2 h-2 mt-1 rounded-full bg-primary" />
                  <div>
                    <p>{item.time}</p>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {/* Input lý do từ chối */}
          <input
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Nhập lý do (nếu từ chối)..."
            className="w-full h-10 px-3 rounded-lg bg-gray-100 text-sm focus:ring-2 focus:ring-primary/30"
          />
          <div className="flex gap-3">
            <button
              className={`flex-1 h-10 rounded-lg border font-bold text-red-500
                ${status !== "Pending" ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-red-500 hover:bg-red-50"}`}
              onClick={handleRejectClick}
              disabled={status !== "Pending"}
            >
              Từ chối
            </button>
            <button
              className={`flex-1 h-10 rounded-lg font-bold text-white bg-primary
                ${status !== "Pending" ? "bg-gray-200 cursor-not-allowed" : "hover:bg-blue-700"}`}
              onClick={() => onApprove?.(request.id)}
              disabled={status !== "Pending"}
            >
              ✓ Duyệt ngay
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
