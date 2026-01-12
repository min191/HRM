import React, { useState, useEffect } from 'react';
import { getEmployees } from '../../services/employeeService';
import ClosePopup from "./ClosePopup";

const AssignmentPopup = ({ isOpen, closeModal, createTask }) => {
  const [taskName, setTaskName] = useState("");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Trung bình");
  const [description, setDescription] = useState("");

  const [allEmployees, setAllEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeesInDept, setEmployeesInDept] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setAllEmployees(data);

        const deptSet = new Set(data.map(emp => emp.department));
        setDepartments([...deptSet]);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (department) {
      const filtered = allEmployees.filter(emp => emp.department === department);
      setEmployeesInDept(filtered);
      setEmployee("");
    } else {
      setEmployeesInDept([]);
    }
  }, [department, allEmployees]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({
      taskName,
      employee,
      department,
      startDate,
      deadline,
      priority,
      description
    });
    closeModal();
  };

  if (!isOpen) return null;

  return (
  <ClosePopup onClose={closeModal}>
    <div className="bg-white w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8">
      
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        Phân công công việc
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Điền đầy đủ thông tin để giao việc cho nhân viên
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Tên nhiệm vụ */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tên nhiệm vụ
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="VD: Nâng cấp hệ thống bảo mật"
            required
          />
        </div>

        {/* Phòng ban */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phòng ban
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Chọn phòng ban --</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Nhân viên */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nhân viên phụ trách
          </label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            disabled={!department}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:ring-2
              ${department ? "focus:ring-blue-400" : "opacity-60 cursor-not-allowed"}`}
            required
          >
            <option value="">
              {department ? "Chọn nhân viên" : "Chọn phòng ban trước"}
            </option>
            {employeesInDept.map(emp => (
              <option key={emp.employeeCode} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày bắt đầu & Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Độ ưu tiên */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Độ ưu tiên
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option value="Thấp">🟢 Thấp</option>
            <option value="Trung bình">🟡 Trung bình</option>
            <option value="Cao">🔴 Cao</option>
          </select>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Mô tả chi tiết
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập yêu cầu công việc..."
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            ✔ Phân công
          </button>
        </div>

      </form>
    </div>
  </ClosePopup>
);

};

export default AssignmentPopup;
