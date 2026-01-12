import React, { useEffect, useState } from 'react';

import FilterBar from '../../components/Employees/FilterBar';
import EmployeeTable from '../../components/Employees/EmployeeTable';
import Pagination from '../../components/Employees/Pagination';
import { getEmployees } from '../../services/employeeService';

const Employees = () => {
  const [employees, setEmployees] = useState([]); // toàn bộ data
  const [filteredEmployees, setFilteredEmployees] = useState([]); // data đã lọc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // tăng số items mỗi trang để vừa khung nhìn

  // Fetch dữ liệu khi mount
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    };
    fetchEmployees();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Handle search/filter
  const handleSearch = (searchParams) => {
    const filtered = employees.filter(emp => {
      const matchName = searchParams.name
        ? emp.name.toLowerCase().split(" ").some(word => word.includes(searchParams.name.toLowerCase()))
        : true;
      const matchId = searchParams.employeeCode
        ? emp.employeeId.toLowerCase().includes(searchParams.employeeCode.toLowerCase())
        : true;
      const matchDept = searchParams.department === "Tất cả phòng ban" || emp.department === searchParams.department;
      const matchPos = searchParams.title === "Tất cả chức danh" || emp.position === searchParams.title;
      const matchDegree = searchParams.degree === "Chọn trình độ" || emp.education === searchParams.degree;
      const matchSalary = searchParams.salary === "Chọn bậc lương" || emp.salaryLevel === searchParams.salary;
      const matchStatus = searchParams.status === "Nhân sự..." || emp.status === searchParams.status;

      return matchName && matchId && matchDept && matchPos && matchDegree && matchSalary && matchStatus;
    });

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  // Handle reset
  const handleReset = () => {
    setFilteredEmployees(employees);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      
      {/* FILTER */}
      <div className="bg-white shadow-md rounded p-4">
        <FilterBar onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <EmployeeTable employees={currentEmployees} itemsPerPage={itemsPerPage} />
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Employees;
