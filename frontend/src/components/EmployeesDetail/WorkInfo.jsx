import React from "react";
export default function WorkInfo({ employee }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <Header title="Thông tin công tác" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <Info label="Chức vụ" value={employee.position} />
        <Info label="Phòng ban" value={employee.department} />
        <Info label="Loại hợp đồng" value={employee.contractType} />
        <Info label="Ngày bắt đầu" value={employee.startDate} />

        <div className="space-y-1">
          <p className="text-sm text-slate-500">Trạng thái</p>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
            {employee.workStatus}
          </span>
        </div>
      </div>
    </section>
  );
}

const Header = ({ title }) => (
  <div className="flex items-center gap-2 mb-6">
    <span className="w-1 h-6 bg-teal-600 rounded-full" />
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
  </div>
);

const Info = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-medium text-slate-900">{value}</p>
  </div>
);
