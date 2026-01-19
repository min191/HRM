import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Field from "../common/Field";
export default function EmployeesPopup({ onClose }) {
  const initialForm = useMemo(
    () => ({
      id: "21",
      code: "NV021",
      fullName: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      address: "",

      department: "",
      jobTitle: "",
      workStatus: "Đang làm việc",
      contractType: "",
      contractStart: "",
      contractEnd: "",

      education: "",
      policy: "",
      partyMember: false,
      partyJoinDate: "",
      familyInfo: "",
    }),
    []
  );

  const [form, setForm] = useState(initialForm);

  // ESC để đóng
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // khóa scroll nền khi mở popup
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,

      // Nếu chọn nhân viên biên chế → xoá ngày kết thúc
      ...(name === "contractType" && value === "BIEN_CHE"
        ? { contractEnd: "" }
        : {}),
    }));
  };

  const handleCancel = () => {
    setForm(initialForm);
    onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit employee:", form);
    // nếu muốn đóng sau khi lưu:
    // onClose?.();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* modal */}
      <div
        className="relative w-[min(100%,64rem)] max-h-[90vh] overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Thêm nhân viên mới
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
            aria-label="Đóng"
            title="Đóng"
          >
            ✕
          </button>
        </div>

        {/* Body scroll */}
        <div className="max-h-[calc(90vh-64px)] overflow-y-auto">
          <form className="p-6 space-y-8" onSubmit={handleSubmit}>
            {/* Thông tin cá nhân */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                <h2 className="text-lg font-semibold text-slate-900">
                  Thông tin cá nhân
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field label="ID">
                  <input
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>

                <Field label="Mã nhân viên">
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>

                <Field label="Họ tên">
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ tên"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field label="Ngày sinh">
                  <input
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="date"
                  />
                </Field>

                <Field label="Giới tính">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition appearance-none"
                  >
                    <option value="">-- Chọn --</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </Field>

                <Field label="Số điện thoại">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0xxx xxx xxx"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="tel"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Email">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@company.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="email"
                  />
                </Field>

                <Field label="Địa chỉ">
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Số nhà, tên đường, phường/xã..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>
              </div>
            </section>

            {/* Công việc & Hợp đồng */}
            <section className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                <h2 className="text-lg font-semibold text-slate-900">
                  Công việc &amp; Hợp đồng
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field label="Phòng ban">
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="">-- Chọn --</option>
                    <option>Hành chính</option>
                    <option>Kỹ thuật</option>
                    <option>Kinh doanh</option>
                  </select>
                </Field>

                <Field label="Chức danh">
                  <select
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="">-- Chọn --</option>
                    <option>Trưởng phòng</option>
                    <option>Nhân viên</option>
                  </select>
                </Field>

                <Field label="Trạng thái làm việc">
                  <input
                    name="workStatus"
                    value={form.workStatus}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field label="Loại nhân viên">
                  <select
                    name="contractType"
                    value={form.contractType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="">-- Chọn --</option>
                    <option value="HOP_DONG">Nhân viên hợp đồng</option>
                    <option value="BIEN_CHE">Nhân viên biên chế</option>
                  </select>
                </Field>

                {/* Chỉ hiện khi đã chọn loại nhân viên */}
                {form.contractType && (
                  <Field label="Ngày bắt đầu">
                    <input
                      name="contractStart"
                      value={form.contractStart}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                      type="date"
                    />
                  </Field>
                )}

                {/* Chỉ hiện khi là nhân viên hợp đồng */}
                {form.contractType === "HOP_DONG" && (
                  <Field label="Ngày kết thúc">
                    <input
                      name="contractEnd"
                      value={form.contractEnd}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                      type="date"
                    />
                  </Field>
                )}
              </div>
            </section>

            {/* Thông tin khác */}
            <section className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                <h2 className="text-lg font-semibold text-slate-900">
                  Thông tin khác
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Trình độ học vấn">
                  <select
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="">-- Chọn --</option>
                    <option>Đại học</option>
                    <option>Cao đẳng</option>
                    <option>Thạc sĩ</option>
                  </select>
                </Field>

                {/* <Field label="Chính sách">
                  <select
                    name="policy"
                    value={form.policy}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="">-- Chọn --</option>
                    <option>Chế độ A</option>
                    <option>Chế độ B</option>
                  </select>
                </Field> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                <div className="flex items-center gap-3 py-2">
                  <input
                    id="party_member"
                    name="partyMember"
                    checked={form.partyMember}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-md border-slate-300 text-emerald-600 focus:ring-4 focus:ring-emerald-500/15"
                    type="checkbox"
                  />
                  <label
                    className="text-sm font-semibold text-slate-800 cursor-pointer select-none"
                    htmlFor="party_member"
                  >
                    Đảng viên
                  </label>
                </div>

                <Field label="Ngày vào Đảng">
                  <input
                    name="partyJoinDate"
                    value={form.partyJoinDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                    type="date"
                    disabled={!form.partyMember}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Tên cha">
                  <input
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    placeholder="Nhập họ tên cha"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>

                <Field label="Tên mẹ">
                  <input
                    name="motherName"
                    value={form.motherName}
                    onChange={handleChange}
                    placeholder="Nhập họ tên mẹ"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition"
                    type="text"
                  />
                </Field>
              </div>
            </section>

            {/* Actions */}
            <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
              <button
                className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition"
                type="button"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                className="px-8 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm hover:shadow-md active:scale-[0.98] transition"
                type="submit"
              >
                Lưu nhân viên
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
