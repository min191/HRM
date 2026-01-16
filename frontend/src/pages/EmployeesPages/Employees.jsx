import React, { useEffect, useMemo, useState } from "react";
import FilterBar from "../../components/Employees/FilterBar";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import Pagination from "../../components/common/Pagination";
import { getEmployees } from "../../services/employeeService";

const ITEMS_PER_PAGE = 10; // bạn có thể điều chỉnh

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getEmployees();
        const employeeArray = Array.isArray(data) ? data : [];
        setEmployees(employeeArray);
        setFilteredEmployees(employeeArray);
      } catch (err) {
        setError("Không thể tải danh sách nhân viên. Vui lòng kiểm tra kết nối backend.");
        setEmployees([]);
        setFilteredEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // === Hàm filter (đã fix để không lỗi undefined) ===
  const handleSearch = ({ name = "", employeeCode = "", employeeType = "Tất cả", status = "Tất cả" }) => {
    const filtered = employees.filter((emp) => {
      const matchName = name
        ? emp.fullName?.toLowerCase().includes(name.toLowerCase())
        : true;

      const matchCode = employeeCode
        ? emp.employeeCode?.toLowerCase().includes(employeeCode.toLowerCase())
        : true;

      const matchType =
        employeeType === "Tất cả" ||
        (employeeType === "Biên chế" && emp.employeeType === "PERMANENT") ||
        (employeeType === "Hợp đồng" && emp.employeeType === "CONTRACT");

      const matchStatus =
        status === "Tất cả" ||
        (status === "Đang làm việc" && emp.status === "ACTIVE") ||
        (status === "Đã nghỉ" && emp.status === "RESIGNED");

      return matchName && matchCode && matchType && matchStatus;
    });

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  // === Hàm reset filter ===
  const handleReset = () => {
    setFilteredEmployees(employees);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const currentEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  // Loading / Error UI
  if (loading) {
    return <div className="text-center p-20 text-xl">Đang tải danh sách nhân viên...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center p-20 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* Filter */}
      <FilterBar onSearch={handleSearch} onReset={handleReset} />

      {/* Table */}
      <EmployeeTable employees={currentEmployees} itemsPerPage={ITEMS_PER_PAGE} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Employees;