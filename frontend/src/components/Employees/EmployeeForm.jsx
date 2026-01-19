import React from "react";
import JobContractInfo from "../common/JobContractInfo";
import OtherInfo from "../common/OtherInfo";
import PersonalInfo from "../common/PersonalInfo";


export default function EmployeeForm({ form, setForm, onClose, initialForm }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", form);
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex justify-between">
        <h1 className="text-xl font-bold">Thêm nhân viên</h1>
        <button onClick={onClose} className="opacity-80 hover:opacity-100">✕</button>
      </div>

      {/* Body */}
      <div className="max-h-[calc(92vh-64px)] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-10">
          <PersonalInfo form={form} onChange={handleChange} />
          <JobContractInfo form={form} onChange={handleChange} />
          <OtherInfo form={form} onChange={handleChange} />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setForm(initialForm)}
              className="px-5 py-2 rounded-lg border hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
            >
              Lưu nhân viên
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
