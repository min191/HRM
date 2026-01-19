import React from "react";

export default function ProfileInfo({ employee }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <Header title="Thông tin cá nhân" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
        <Info label="Họ và tên" value={employee.name} />
        <Info label="Mã nhân viên" value={employee.employeeCode} />
        <Info label="Ngày sinh" value={employee.dob} />
        <Info label="Giới tính" value={employee.gender} />
        <Info label="Địa chỉ" value={employee.address} />
        <Info label="Số điện thoại" value={employee.phone} />
        <Info label="Email" value={employee.email} />
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
