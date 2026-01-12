import React from "react";

export default function ReportsDataTable() {
  const data = [
    { id: "NV001", name: "Nguyễn Văn A", department: "Kinh doanh", salary: "25.000.000" },
    { id: "NV023", name: "Trần Thị B", department: "Marketing", salary: "12.000.000" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="p-4 text-left">ID NV</th>
            <th className="p-4 text-left">Họ và tên</th>
            <th className="p-4 text-left">Phòng ban</th>
            <th className="p-4 text-right">Lương</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-4">{item.id}</td>
              <td className="p-4 font-bold text-primary">{item.name}</td>
              <td className="p-4">{item.department}</td>
              <td className="p-4 text-right">{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
