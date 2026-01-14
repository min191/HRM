import React from "react";

export default function EmployeeInfo({ employee }) {
  return (
    <div className="bg-primarySoft rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full bg-gray-200 bg-cover"
          style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${employee.id + 10}')` }}
        />
        <div>
          <p className="font-bold text-gray-900">{employee.name}</p>
          <p className="text-textMuted text-xs">
            {employee.department} • {employee.employeeCode}
          </p>
          <p className="text-textMuted text-xs">{employee.position} - {employee.title}</p>
          <p className="text-textMuted text-xs">Trạng thái: {employee.workStatus}</p>
        </div>
      </div>
    </div>
  );
}
