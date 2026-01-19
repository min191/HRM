// components/Assignment/AssignmentTable.jsx
import React, { useState, useMemo } from 'react';
import { STATUS } from '../../services/assignmentService';

const statusOptions = [
  { value: 'ALL', label: 'Tất cả' },
  { value: STATUS.IN_PROGRESS, label: 'Đang thực hiện' },
  { value: STATUS.COMPLETED, label: 'Hoàn thành' },
  { value: STATUS.OVERDUE, label: 'Quá hạn' },
];

const statusStyle = (status) => {
  switch (status) {
    case STATUS.COMPLETED:
      return 'bg-green-100 text-green-700 border border-green-300';
    case STATUS.IN_PROGRESS:
      return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    case STATUS.OVERDUE:
      return 'bg-red-100 text-red-700 border border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-300';
  }
};

const PAGE_SIZE = 5;

const AssignmentTable = ({ assignments = [] }) => {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  /* ======================
     FILTER
  ====================== */
  const filteredAssignments = useMemo(() => {
    const data =
      statusFilter === 'ALL'
        ? assignments
        : assignments.filter((a) => a.status === statusFilter);

    setCurrentPage(1); // reset page khi đổi filter
    return data;
  }, [assignments, statusFilter]);

  /* ======================
     PAGINATION
  ====================== */
  const totalPages = Math.ceil(filteredAssignments.length / PAGE_SIZE);

  const pagedData = filteredAssignments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {/* FILTER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Danh sách công việc
        </h2>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-gray-600">
              <th className="border px-3 py-2 text-left">Mã NV</th>
              <th className="border px-3 py-2 text-left">Tên NV</th>
              <th className="border px-3 py-2 text-left">Phòng ban</th>
              <th className="border px-3 py-2 text-left">Công việc</th>
              <th className="border px-3 py-2 text-center">Ngày giao</th>
              <th className="border px-3 py-2 text-center">Deadline</th>
              <th className="border px-3 py-2 text-center">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Không có công việc phù hợp
                </td>
              </tr>
            ) : (
              pagedData.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition">
                  <td className="border px-3 py-2">{a.employeeCode}</td>
                  <td className="border px-3 py-2">{a.employeeName}</td>
                  <td className="border px-3 py-2">{a.department}</td>
                  <td className="border px-3 py-2">{a.taskName}</td>
                  <td className="border px-3 py-2 text-center">
                    {a.assignedDate}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {a.deadline}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        a.status
                      )}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50 hover:bg-gray-100"
          >
            ← Trước
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm border ${
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50 hover:bg-gray-100"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentTable;
