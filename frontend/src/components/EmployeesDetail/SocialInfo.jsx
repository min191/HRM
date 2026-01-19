import React,{ useState } from "react";

export default function SocialInfo({ employee }) {
  const [isDoanVien, setIsDoanVien] = useState(true);

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <Header title="Thông tin chính trị - xã hội" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <Info label="Đảng viên" value={employee.politicalStatus} />
        <Info label="Ngày vào Đảng" value={employee.politicalPartyDate} />

        <div className="space-y-4">
          <Toggle
            label="Đoàn viên"
            checked={isDoanVien}
            onChange={() => setIsDoanVien(!isDoanVien)}
          />
          <Info label="Ngày vào Đoàn" value={employee.youthUnionDate} />
        </div>

        <Info label="Diện chính sách" value={employee.policyStatus} />
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

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between max-w-xs">
    <span className="text-sm text-slate-500">{label}</span>
    <button
      onClick={onChange}
      className={`w-10 h-5 rounded-full relative transition ${
        checked ? "bg-teal-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0 left-0 h-5 w-5 bg-white rounded-full shadow transform transition ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  </div>
);
