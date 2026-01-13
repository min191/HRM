import React, { useEffect, useState } from "react";
import { getUserList } from "../services/userService";

import AccountPermissionFilter from "../components/AccountPermission/AccountPermissionFilter";
import AccountPermissionTable from "../components/AccountPermission/AccountPermissionTable";

import Pagination from "../components/common/Pagination";
import EditAccountPopup from "../components/Popup/EditAccountPopup";

const PAGE_SIZE = 5;

export default function AccountPermission() {
  const [users, setUsers] = useState([]);

  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [editingUser, setEditingUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    getUserList().then(setUsers);
  }, []);

  /* Reset page when filter/search change */
  useEffect(() => {
    setPage(1);
  }, [roleFilter, statusFilter, search]);

  /* ================= FILTER ================= */
  const filteredUsers = users.filter((user) => {
    const matchRole = roleFilter ? user.role === roleFilter : true;
    const matchStatus = statusFilter
      ? user.workStatus === statusFilter
      : true;

    const keyword = search.toLowerCase();
    const matchSearch =
      !search ||
      user.username.toLowerCase().includes(keyword) ||
      user.employeeCode.toLowerCase().includes(keyword);

    return matchRole && matchStatus && matchSearch;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const pagedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ================= ACTION HANDLERS ================= */
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEdit(true);
  };

  const handleSave = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setShowEdit(false);
  };

  const handleDelete = (user) => {
    const ok = window.confirm(
      `Bạn có chắc chắn muốn xóa tài khoản "${user.username}" không?`
    );

    if (ok) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex h-screen w-full bg-background font-display text-gray-900">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* FILTER */}
        <AccountPermissionFilter
          search={search}
          onSearch={setSearch}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          setRoleFilter={setRoleFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* CONTENT */}
        <div className="flex-1 overflow-auto px-4 md:px-8 py-6 space-y-4">
          <AccountPermissionTable
            users={pagedUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </main>

      {/* EDIT MODAL */}
      <EditAccountPopup
        open={showEdit}
        user={editingUser}
        onClose={() => setShowEdit(false)}
        onSave={handleSave}
      />
    </div>
  );
}
