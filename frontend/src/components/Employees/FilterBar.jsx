import React, { useState } from 'react';

const FilterBar = ({ onSearch, onReset }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Tất cả phòng ban");
  const [selectedTitle, setSelectedTitle] = useState("Tất cả chức danh");
  const [selectedDegree, setSelectedDegree] = useState("Chọn trình độ");
  const [selectedSalary, setSelectedSalary] = useState("Chọn bậc lương");
  const [selectedStatus, setSelectedStatus] = useState("Nhân sự...");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      name: searchQuery,
      employeeCode,
      department: selectedDepartment,
      title: selectedTitle,
      degree: selectedDegree,
      salary: selectedSalary,
      status: selectedStatus,
    });
  };

  const handleReset = () => {
    setSearchQuery("");
    setEmployeeCode("");
    setSelectedDepartment("Tất cả phòng ban");
    setSelectedTitle("Tất cả chức danh");
    setSelectedDegree("Chọn trình độ");
    setSelectedSalary("Chọn bậc lương");
    setSelectedStatus("Nhân sự...");
    if (onReset) onReset();
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="mb-6 rounded-2xl bg-white p-6 shadow-xl border border-gray-100"
>
  {/* Row 1 */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
    {/* Tên */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Họ và tên</label>
      <input
        type="text"
        placeholder="Nhập họ tên..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      />
    </div>

    {/* Mã NV */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Mã nhân viên</label>
      <input
        type="text"
        placeholder="Nhập mã nhân viên..."
        value={employeeCode}
        onChange={(e) => setEmployeeCode(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      />
    </div>

    {/* Phòng ban */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Phòng ban</label>
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   bg-white focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      >
        <option value="Tất cả phòng ban">Tất cả phòng ban</option>
        <option value="Phòng nhân sự">Phòng nhân sự</option>
        <option value="Phòng IT">Phòng IT</option>
      </select>
    </div>
  </div>

  {/* Row 2 */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
    {/* Chức danh */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Chức danh</label>
      <select
        value={selectedTitle}
        onChange={(e) => setSelectedTitle(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   bg-white focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      >
        <option value="Tất cả chức danh">Tất cả chức danh</option>
        <option value="Giám đốc">Giám đốc</option>
        <option value="Trưởng phòng">Trưởng phòng</option>
      </select>
    </div>

    {/* Trình độ */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Trình độ chuyên môn</label>
      <select
        value={selectedDegree}
        onChange={(e) => setSelectedDegree(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   bg-white focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      >
        <option value="Chọn trình độ">Chọn trình độ</option>
        <option value="Cử nhân">Cử nhân</option>
        <option value="Thạc sĩ">Thạc sĩ</option>
      </select>
    </div>

    {/* Bậc lương */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Bậc lương</label>
      <select
        value={selectedSalary}
        onChange={(e) => setSelectedSalary(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   bg-white focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      >
        <option value="Chọn bậc lương">Chọn bậc lương</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>
    </div>

    {/* Trạng thái */}
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">Trạng thái</label>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   bg-white focus:border-primary focus:ring-2 focus:ring-primary/30
                   outline-none transition"
      >
        <option value="Nhân sự...">Nhân sự...</option>
        <option value="Biên chế">Biên chế</option>
        <option value="Hợp đồng">Hợp đồng</option>
      </select>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-col md:flex-row justify-end gap-3">
    <button
      type="button"
      onClick={handleReset}
      className="rounded-xl border border-gray-300 px-6 py-2.5
                 text-gray-700 hover:bg-gray-100 transition"
    >
      Làm mới
    </button>

    <button
      type="submit"
      className="rounded-xl bg-primary px-6 py-2.5
                 font-semibold text-white
                 hover:bg-primary-dark shadow-lg transition"
    >
      Tìm kiếm
    </button>
  </div>
</form>

  );
};

export default FilterBar;
