import React, { useEffect, useState } from "react";
import { getUserList } from "../services/userService";
import AccountPermissionFilter from "../components/AccountPermission/AccountPermissionFilter";
import AccountPermissionTable from "../components/AccountPermission/AccountPermissionTable";

export default function AccountPermission() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUserList().then(setUsers);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchRole = roleFilter ? user.role === roleFilter : true;
    const matchStatus = statusFilter ? user.workStatus === statusFilter : true;
    const matchSearch =
      search === "" ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.employeeCode.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  return (
    <div className="flex h-screen w-full bg-background font-display text-gray-900">
      <main className="flex-1 flex flex-col overflow-hidden">
        <AccountPermissionFilter
          search={search}
          onSearch={setSearch}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          setRoleFilter={setRoleFilter}
          setStatusFilter={setStatusFilter}
        />
        <div className="flex-1 overflow-auto px-8 py-6">
          <AccountPermissionTable users={filteredUsers} />
        </div>
      </main>
    </div>
  );
}
