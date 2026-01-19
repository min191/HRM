import React from "react";
import InfoRow from "./InfoRow";

export default function RequestCard({ request }) {
  // Hàm tính số ngày nghỉ
  const calculateDays = (start, end) => {
    if (!start || !end) return "?";
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffTime = endDate - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays > 0 ? diffDays : "?";
  };

  return (
    <div className="border border-border rounded-xl p-4 bg-white space-y-3 shadow-sm">
      {/* Header: Loại yêu cầu và trạng thái */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm sm:text-base">{request.type}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${
            request.status === "Pending"
              ? "bg-amber-100 text-amber-700"
              : request.status === "Approved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {request.status}
        </span>
      </div>

      {/* Thông tin chi tiết */}
      <InfoRow label="Thời gian" value={`${request.startDate} → ${request.endDate}`} />
      <InfoRow label="Số ngày" value={calculateDays(request.startDate, request.endDate)} />
      <InfoRow label="Ngày gửi" value={request.createdAt} />

      {/* Lý do */}
      <div>
        <p className="text-textMuted font-medium mb-1">Lý do</p>
        <div className="bg-gray-50 p-2 rounded text-sm">{request.reason}</div>
      </div>

      {/* History */}
      {request.history && request.history.length > 0 && (
        <div>
          <p className="text-textMuted font-medium mb-1">Lịch sử</p>
          <ul className="text-xs text-gray-600 space-y-1 max-h-20 overflow-y-auto">
            {request.history.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.time}:</span> {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
