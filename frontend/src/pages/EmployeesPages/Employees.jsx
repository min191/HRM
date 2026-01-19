import React, { useEffect, useMemo, useState } from "react";

import FilterBar from "../../components/Employees/FilterBar";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import Pagination from "../../components/common/Pagination";
import { getEmployees } from "../../services/employeeService";
import EmployeesPopup from "../../components/Popup/EmployeesPopup";

const ITEMS_PER_PAGE = 5;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  // ===== FETCH DATA =====
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      }
    };
    fetchEmployees();
  }, []);

  // ===== PAGINATION =====
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const currentEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredEmployees, totalPages, currentPage]);

  // ===== SEARCH =====
  const handleSearch = (searchParams) => {
    const filtered = employees.filter((emp) => {
      const matchName = searchParams.name
        ? emp.name.toLowerCase().includes(searchParams.name.toLowerCase())
        : true;

      const matchDept =
        searchParams.department === "Tất cả phòng ban" ||
        emp.department === searchParams.department;

      const matchPos =
        searchParams.title === "Tất cả chức danh" ||
        emp.position === searchParams.title;

      const matchStatus =
        searchParams.status === "Nhân sự..." ||
        emp.status === searchParams.status;

      return matchName && matchDept && matchPos && matchStatus;
    });

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredEmployees(employees);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* FILTER */}
      <div className="bg-white shadow-sm rounded-xl p-4">
        <FilterBar onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-sm rounded-xl">
        <EmployeeTable
          employees={currentEmployees}
          itemsPerPage={ITEMS_PER_PAGE}
          setOpenModal={setOpenModal}
        />
      </div>

      {/* POPUP */}
      {openModal && (
        <EmployeesPopup onClose={() => setOpenModal(false)} />
      )}

      {/* PAGINATION */}
      <div className="flex justify-end">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Employees;
