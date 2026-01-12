import React from "react";

export default function AccountPermissionTable({ users }) {
  return (
    <table className="min-w-full border border-border rounded-xl bg-white">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border-b border-border text-left">Tên đăng nhập</th>
          <th className="px-4 py-2 border-b border-border text-left">Mã NV</th>
          <th className="px-4 py-2 border-b border-border text-left">Vai trò</th>
          <th className="px-4 py-2 border-b border-border text-left">Phòng ban</th>
          <th className="px-4 py-2 border-b border-border text-left">Chức vụ</th>
          <th className="px-4 py-2 border-b border-border text-left">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className={`${user.hidden ? "hidden" : ""}`}>
            <td className="px-4 py-2 border-b border-border">{user.username}</td>
            <td className="px-4 py-2 border-b border-border">{user.employeeCode}</td>
            <td className="px-4 py-2 border-b border-border">{user.role}</td>
            <td className="px-4 py-2 border-b border-border">{user.department}</td>
            <td className="px-4 py-2 border-b border-border">{user.position}</td>
            <td
              className={`px-4 py-2 border-b border-border font-medium ${
                user.workStatus === "Đang làm việc" ? "text-green-600" : "text-gray-400"
              }`}
            >
              {user.workStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
