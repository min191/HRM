// components/Approvals/ApprovalsRequestCard.jsx
import React from "react";

export default function ApprovalsRequestCard({ request, onClick, onApprove, onReject }) {
  if (!request) return null;

  const { employee = {}, type, duration, reason, status } = request;
  const name = employee.name || "";
  const dept = employee.department || "";
  const title = type;
  const desc = reason;

  const typeColors = {
    "Nghỉ phép": "bg-green-100 text-green-800",
    "Đi công tác": "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className={`
        flex flex-col md:flex-row gap-4 p-5 rounded-xl border border-gray-200 
        bg-white shadow-sm hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
            <p className="text-xs text-gray-500">{dept} • {duration}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              typeColors[type] || typeColors.default
            }`}
          >
            {type}
          </span>
        </div>
        <p className="mt-2 font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{desc}</p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0 items-center">
        <button
          className={`h-9 px-4 rounded-lg font-semibold transition 
                      ${status === "Pending" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          onClick={(e) => { e.stopPropagation(); onApprove?.(request.id); }}
          disabled={status !== "Pending"}
        >
          Duyệt
        </button>
        <button
          className={`h-9 px-4 rounded-lg border font-semibold transition
                      ${status === "Pending" ? "border-red-500 text-red-600 hover:bg-red-50" : "border-gray-200 text-gray-400 cursor-not-allowed"}`}
          onClick={(e) => { e.stopPropagation(); onReject?.(request.id); }}
          disabled={status !== "Pending"}
        >
          Từ chối
        </button>
      </div>
    </div>
  );
}
