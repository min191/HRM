import React, { useState, useEffect, useMemo } from "react";
import { getEmployees } from "../../services/employeeService";
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

        const deptSet = new Set(data.map((emp) => emp.department));
        setDepartments([...deptSet]);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (department) {
      const filtered = allEmployees.filter(
        (emp) => emp.department === department
      );
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
      description,
    });
    closeModal();
  };

  const priorityDotClass = useMemo(() => {
    if (priority === "Cao")
      return "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.45)]";
    if (priority === "Thấp")
      return "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.45)]";
    return "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]";
  }, [priority]);

  if (!isOpen) return null;

  return (
    <ClosePopup onClose={closeModal}>
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Phân công công việc
              </h2>
              <p className="text-xs text-gray-500">
                Thiết lập trách nhiệm và thời hạn
              </p>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-50 rounded-lg"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 overflow-y-auto custom-scrollbar"
        >
          <div className="space-y-4">
            {/* Task name */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                Tên nhiệm vụ
              </label>
              <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 outline-none"
                placeholder="VD: Nâng cấp hệ thống bảo mật"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Left */}
              <div className="space-y-4">
                {/* Department */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                    Phòng ban
                  </label>
                  <div className="relative">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Employee */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                    Nhân viên phụ trách
                  </label>
                  <div className="relative">
                    <select
                      value={employee}
                      onChange={(e) => setEmployee(e.target.value)}
                      disabled={!department}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 appearance-none cursor-pointer disabled:opacity-60"
                      required
                    >
                      <option value="">
                        {department
                          ? "Chọn nhân viên"
                          : "Chọn phòng ban trước"}
                      </option>
                      {employeesInDept.map((emp) => (
                        <option
                          key={emp.employeeCode}
                          value={emp.name}
                        >
                          {emp.name}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                      Ngày BĐ
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-2 py-2 text-sm rounded-lg border border-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-2 py-2 text-sm rounded-lg border border-gray-200"
                      required
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                    Độ ưu tiên
                  </label>
                  <div className="relative">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 appearance-none cursor-pointer"
                    >
                      <option value="Cao">Cao</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Thấp">Thấp</option>
                    </select>

                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <span
                        className={`w-2 h-2 rounded-full block ${priorityDotClass}`}
                      />
                    </div>

                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                Mô tả chi tiết
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 resize-none"
                placeholder="Mô tả yêu cầu cụ thể..."
                required
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-white rounded-lg"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 text-xs font-semibold text-white bg-[#009688] hover:bg-[#00796b] rounded-lg shadow-md"
          >
            Phân công
          </button>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e5e7eb;
            border-radius: 9999px;
          }
        `}</style>
      </div>
    </ClosePopup>
  );
};

export default AssignmentPopup;
