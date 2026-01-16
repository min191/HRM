import React, { useEffect, useState } from "react";
import Input from "../FormField/Input";
import Select from "../FormField/Select";
import { getEmployees } from "../../services/employeeService";
import ClosePopup from "./ClosePopup";

/* =======================
   OPTIONS
======================= */
const DEPARTMENT_OPTIONS = [
  "Nhân sự",
  "Kế toán",
  "Hành chính",
  "Công nghệ thông tin",
];

const TITLE_BY_DEPARTMENT = {
  "Nhân sự": ["Nhân viên", "Phó phòng", "Trưởng phòng"],
  "Kế toán": ["Nhân viên", "Kế toán trưởng"],
  "Hành chính": ["Nhân viên", "Tổ trưởng"],
  "Công nghệ thông tin": ["Developer", "Leader", "Manager"],
};

const EDUCATION_OPTIONS = ["Cử nhân", "Thạc sĩ", "Tiến sĩ"];

const POLICY_OPTIONS = [
  "Không",
  "Thương binh",
  "Con liệt sĩ",
  "Gia đình chính sách",
];

/* =======================
   HELPER
======================= */
const generateNextEmployeeCode = (employees) => {
  if (!employees || employees.length === 0) return "NV001";

  const maxNumber = Math.max(
    ...employees.map((e) =>
      parseInt(e.employeeCode.replace("NV", ""), 10)
    )
  );

  return "NV" + String(maxNumber + 1).padStart(3, "0");
};

/* =======================
   COMPONENT
======================= */
const EmployeesPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    employeeCode: "",
    name: "",
    department: "",
    title: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    education: "",
    policyStatus: "",
    youthUnionMember: false,
    politicalPartyDate: "",
    contractType: "",
    startDate: "",
    endDate: "",
    workStatus: "Đang làm việc",
    familyInfo: "",
  });

  /* ===== LOAD CODE ===== */
  useEffect(() => {
    const loadEmployeeCode = async () => {
      const employees = await getEmployees();
      setFormData((prev) => ({
        ...prev,
        id: employees.length + 1,
        employeeCode: generateNextEmployeeCode(employees),
      }));
    };
    loadEmployeeCode();
  }, []);

  /* ===== HANDLE CHANGE ===== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Khi đổi phòng ban → reset chức danh
    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        department: value,
        title: "",
      }));
      return;
    }

    // Checkbox Đảng viên
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        youthUnionMember: checked,
        politicalPartyDate: checked ? prev.politicalPartyDate : "",
      }));
      return;
    }

    // Chức danh + phòng ban
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: `${value} - ${prev.department}`,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nhân viên mới:", formData);
    onClose();
  };

  const titleOptions = TITLE_BY_DEPARTMENT[formData.department] || [];

  return (
     <ClosePopup onClose={onClose}>
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Thêm nhân viên mới</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input label="ID" value={formData.id || ""} readOnly />
          <Input label="Mã nhân viên" value={formData.employeeCode} readOnly />

          <Input label="Họ tên" name="name" onChange={handleChange} />

          <Select
            label="Phòng ban"
            name="department"
            options={DEPARTMENT_OPTIONS}
            value={formData.department}
            onChange={handleChange}
          />

          <Select
            label="Chức danh"
            name="title"
            options={titleOptions}
            value={formData.title.split(" - ")[0] || ""}
            onChange={handleChange}
            disabled={!formData.department}
          />

          <Input
            label="Ngày sinh"
            type="date"
            name="dob"
            onChange={handleChange}
          />

          <Select
            label="Giới tính"
            name="gender"
            options={["Nam", "Nữ"]}
            value={formData.gender}
            onChange={handleChange}
          />

          <Input label="Số điện thoại" name="phone" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Địa chỉ" name="address" onChange={handleChange} />

          <Select
            label="Trình độ học vấn"
            name="education"
            options={EDUCATION_OPTIONS}
            value={formData.education}
            onChange={handleChange}
          />

          <Select
            label="Chính sách"
            name="policyStatus"
            options={POLICY_OPTIONS}
            value={formData.policyStatus}
            onChange={handleChange}
          />

          {/* ĐẢNG VIÊN */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={formData.youthUnionMember}
              onChange={handleChange}
            />
            <label className="text-sm font-medium">Đảng viên</label>
          </div>

          <Input
            label="Ngày vào Đảng"
            type="date"
            name="politicalPartyDate"
            value={formData.politicalPartyDate}
            onChange={handleChange}
            disabled={!formData.youthUnionMember}
          />

          <Select
            label="Loại hợp đồng"
            name="contractType"
            options={["Biên chế", "Hợp đồng"]}
            value={formData.contractType}
            onChange={handleChange}
          />

          <Input
            label="Ngày bắt đầu"
            type="date"
            name="startDate"
            onChange={handleChange}
          />

          <Input
            label="Ngày kết thúc"
            type="date"
            name="endDate"
            onChange={handleChange}
          />

          <Input
            label="Trạng thái làm việc"
            value={formData.workStatus}
            readOnly
          />

          <div className="col-span-2">
            <label className="block text-sm font-medium">
              Thông tin gia đình
            </label>
            <textarea
              name="familyInfo"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
   </ClosePopup>
  );
};

export default EmployeesPopup;
