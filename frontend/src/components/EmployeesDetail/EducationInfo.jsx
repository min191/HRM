import React from "react";
export default function EducationInfo({ employee }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <Header title="Trình độ chuyên môn" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <Info label="Trình độ / Bằng cấp" value={employee.education} />
        <Info label="Trường đào tạo" value="Chưa cập nhật" muted />
        <Info label="Năm tốt nghiệp" value="Chưa cập nhật" muted />
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

const Info = ({ label, value, muted }) => (
  <div className="space-y-1">
    <p className="text-sm text-slate-500">{label}</p>
    <p
      className={`font-medium ${
        muted ? "text-slate-400 italic" : "text-slate-900"
      }`}
    >
      {value}
    </p>
  </div>
);
