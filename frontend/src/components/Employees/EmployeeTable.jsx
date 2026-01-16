import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ employees, itemsPerPage }) => {
  const navigate = useNavigate();
  const emptyRows = itemsPerPage - employees.length > 0 ? itemsPerPage - employees.length : 0;

  return (
    <div className="overflow-x-auto bg-white dark:bg-surface-dark p-6 rounded-lg shadow-lg min-h-[340px]">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Mã NV</th>
            <th className="px-4 py-2 text-left">Họ và tên</th>
            <th className="px-4 py-2 text-left">Chức vụ</th>
            <th className="px-4 py-2 text-left">Phòng ban</th>
            <th className="px-4 py-2 text-left">Loại nhân viên</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr
              key={emp.id}
              onClick={() => navigate(`/employees/${emp.id}`, { state: emp })}
              className="border-t h-14 cursor-pointer transition hover:bg-primary hover:text-white"
            >
              <td className="px-4 py-2">{`#NV00${emp.id}`}</td>
              <td className="px-4 py-2 font-medium">{emp.name}</td>
              <td className="px-4 py-2">{emp.position}</td>
              <td className="px-4 py-2">{emp.department}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    emp.status === 'Biên chế' ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                >
                  {emp.status}
                </span>
              </td>
            </tr>
          ))}

          {Array.from({ length: emptyRows }).map((_, idx) => (
            <tr key={`empty-${idx}`} className="border-t h-14">
              <td colSpan={5}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
