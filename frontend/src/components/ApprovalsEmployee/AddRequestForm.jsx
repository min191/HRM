import React from "react";

export default function AddRequestForm({ request, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-800">
        Tạo yêu cầu mới
      </h3>

      {/* Loại yêu cầu */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          Loại yêu cầu
        </label>
        <input
          type="text"
          name="type"
          placeholder="VD: Nghỉ phép, Nghỉ ốm..."
          value={request.type}
          onChange={onChange}
          className="
            w-full rounded-lg border border-border
            px-4 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
        />
      </div>

      {/* Ngày */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500">
            Từ ngày
          </label>
          <input
            type="date"
            name="startDate"
            value={request.startDate}
            onChange={onChange}
            className="
              w-full rounded-lg border border-border
              px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500">
            Đến ngày
          </label>
          <input
            type="date"
            name="endDate"
            value={request.endDate}
            onChange={onChange}
            className="
              w-full rounded-lg border border-border
              px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
          />
        </div>
      </div>

      {/* Lý do */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          Lý do
        </label>
        <textarea
          name="reason"
          placeholder="Nhập lý do nghỉ phép..."
          value={request.reason}
          onChange={onChange}
          rows={4}
          className="
            w-full rounded-lg border border-border
            px-4 py-2.5 text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="
          w-full bg-primary text-white
          py-3 rounded-xl text-sm font-medium
          hover:bg-primaryDark transition
          shadow-sm
        "
      >
        Gửi yêu cầu
      </button>
    </form>
  );
}
