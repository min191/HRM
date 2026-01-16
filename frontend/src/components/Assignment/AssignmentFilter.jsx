import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";

export default function AssignmentFilter({
  assignments = [],
  onFilter = () => {},
  openModal,
}) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [department, setDepartment] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");

  /* =======================
     LOAD EMPLOYEES
  ======================= */
  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  /* =======================
     FILTER EMPLOYEE BY DEPARTMENT
  ======================= */
  useEffect(() => {
    if (!department) {
      setFilteredEmployees([]);
      setEmployeeName(""); // reset nhân viên khi đổi phòng ban
      return;
    }

    const list = employees.filter(
      (emp) => emp.department === department
    );

    setFilteredEmployees(list);
    setEmployeeName("");
  }, [department, employees]);

  /* =======================
     FILTER ASSIGNMENTS
  ======================= */
  useEffect(() => {
    const filtered = assignments.filter((a) => {
      const matchDepartment =
        !department || a.department === department;

      const matchEmployee =
        !employeeName || a.employeeName === employeeName;

      const matchTask =
        !taskName ||
        a.taskName.toLowerCase().includes(taskName.toLowerCase());

      const matchDeadline =
        !deadline || a.deadline === deadline;

      return (
        matchDepartment &&
        matchEmployee &&
        matchTask &&
        matchDeadline
      );
    });

    onFilter(filtered);
  }, [department, employeeName, taskName, deadline, assignments]);

  /* =======================
     UI
  ======================= */
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* PHÒNG BAN */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Tất cả phòng ban</option>
          {[...new Set(assignments.map(a => a.department))].map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        {/* NHÂN VIÊN */}
        <select
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          disabled={!department}
          className="px-4 py-2 border rounded-lg disabled:bg-gray-100"
        >
          <option value="">
            {department ? "Chọn nhân viên" : "Chọn phòng ban trước"}
          </option>

          {filteredEmployees.map(emp => (
            <option key={emp.id} value={emp.name}>
              {emp.employeeCode} - {emp.name}
            </option>
          ))}
        </select>

        {/* TÊN NHIỆM VỤ */}
        <input
          type="text"
          placeholder="Tên nhiệm vụ..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        {/* DEADLINE */}
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        {/* BUTTON */}
        <button
          onClick={openModal}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          + Tạo mới
        </button>

      </div>
    </div>
  );
}
