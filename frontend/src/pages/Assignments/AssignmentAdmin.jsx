import React, { useState, useEffect } from "react";
import AssignmentFilter from "../../components/Assignment/AssignmentFilter";
import AssignmentTable from "../../components/Assignment/AssignmentTable";
import AssignmentPopup from "../../components/Popup/AssignmentPopup";
import { getAssignments } from "../../services/assignmentService";

const AssignmentAdmin = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [filter, setFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await getAssignments();
      setAssignments(data);
      setFilteredAssignments(data); // gán dữ liệu gốc
    };
    fetchAssignments();
  }, []);

  // Hàm lọc assignments
  const filterAssignments = (searchQuery, department) => {
    let result = assignments;

    if (searchQuery) {
      result = result.filter(
        (a) =>
          a.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (a.taskName &&
            a.taskName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (department) {
      result = result.filter((a) => a.department === department);
    }

    setFilteredAssignments(result);
  };

  // Handle search
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setFilter(searchQuery);
    filterAssignments(searchQuery, departmentFilter);
  };

  // Handle department filter
  const handleDepartmentChange = (e) => {
    const dept = e.target.value;
    setDepartmentFilter(dept);
    filterAssignments(filter, dept);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const createTask = (task) => {
    console.log("Created Task:", task);
    // TODO: gọi API lưu task
  };

  return (
    <div className="p-6">
      <AssignmentFilter
        assignments={assignments}
        onFilter={setFilteredAssignments} // ← dòng này
        openModal={openModal}
      />

      <AssignmentTable assignments={filteredAssignments} />
      <AssignmentPopup
        isOpen={isModalOpen}
        closeModal={closeModal}
        createTask={createTask}
      />
    </div>
  );
};

export default AssignmentAdmin;
