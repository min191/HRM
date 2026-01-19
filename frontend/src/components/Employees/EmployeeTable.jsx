import React from "react";
import { useNavigate } from "react-router-dom";
import Action from "../common/Action";

const EmployeeTable = ({ employees, itemsPerPage, setOpenModal }) => {
  const navigate = useNavigate();

  const emptyRows =
    itemsPerPage - employees.length > 0 ? itemsPerPage - employees.length : 0;

  return (
    <div className="p-6 min-h-[340px]">
      {/* ACTION */}
      <div className="flex justify-end mb-6">
        <Action
          onClick={() => setOpenModal(true)}
          label={
            <div className="flex items-center gap-2">
              <span className="text-lg">＋</span>
              <span>Thêm nhân viên</span>
            </div>
          }
          className="
      flex items-center gap-2
      rounded-full
      bg-gradient-to-r from-primary to-indigo-600
      px-6 py-2.5
      text-sm font-semibold text-white
      shadow-md
      hover:shadow-xl hover:scale-105
      transition-all duration-200
      active:scale-95
    "
        />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Mã NV</th>
            <th className="px-4 py-2 text-left">Họ và tên</th>
            <th className="px-4 py-2 text-left">Chức vụ</th>
            <th className="px-4 py-2 text-left">Phòng ban</th>
            <th className="px-4 py-2 text-left">Loại</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              onClick={() => navigate(`/employees/${emp.id}`, { state: emp })}
              className="border-t h-14 cursor-pointer hover:bg-primary hover:text-white transition"
            >
              <td className="px-4 py-2">#NV{emp.id}</td>
              <td className="px-4 py-2 font-medium">{emp.name}</td>
              <td className="px-4 py-2">{emp.position}</td>
              <td className="px-4 py-2">{emp.department}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    emp.status === "Biên chế" ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {emp.status}
                </span>
              </td>
            </tr>
          ))}

          {Array.from({ length: emptyRows }).map((_, i) => (
            <tr key={i} className="border-t h-14">
              <td colSpan={5}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
