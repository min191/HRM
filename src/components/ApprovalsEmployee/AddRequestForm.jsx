import React from "react";

export default function AddRequestForm({ request, onChange, onSubmit }) {
  return (
    <form className="bg-white space-y-3" onSubmit={onSubmit}>
      <h3 className="font-semibold text-lg">Thêm yêu cầu mới</h3>
      <input
        type="text"
        name="type"
        placeholder="Loại yêu cầu"
        value={request.type}
        onChange={onChange}
        className="w-full border border-border rounded px-3 py-2 text-sm"
      />
      <div className="flex gap-2">
        <input
          type="date"
          name="startDate"
          value={request.startDate}
          onChange={onChange}
          className="w-1/2 border border-border rounded px-3 py-2 text-sm"
        />
        <input
          type="date"
          name="endDate"
          value={request.endDate}
          onChange={onChange}
          className="w-1/2 border border-border rounded px-3 py-2 text-sm"
        />
      </div>
      <textarea
        name="reason"
        placeholder="Lý do"
        value={request.reason}
        onChange={onChange}
        className="w-full border border-border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primaryDark transition"
      >
        Gửi yêu cầu
      </button>
    </form>
  );
}
