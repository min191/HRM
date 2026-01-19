import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEmployeeById } from "../../services/employeeService";
import ProfileInfo from "../../components/EmployeesDetail/ProfileInfo";
import EducationInfo from "../../components/EmployeesDetail/EducationInfo";
import SocialInfo from "../../components/EmployeesDetail/SocialInfo";
import WorkInfo from "../../components/EmployeesDetail/WorkInfo";
import FamilyInfo from "../../components/EmployeesDetail/FamilyInfo";



export default function EmployeesDetail() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      setLoading(true);
      const data = await getEmployeeById(id);
      setEmployee(data);
      setLoading(false);
    }

    fetchEmployee();
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Đang tải thông tin nhân viên...
      </div>
    );
  }

  // ❌ Không tìm thấy
  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Không tìm thấy nhân viên
      </div>
    );
  }

  // ✅ Render khi có data
  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <ProfileInfo employee={employee} />
        <EducationInfo employee={employee} />
        <SocialInfo employee={employee} />
        <WorkInfo employee={employee} />
        <FamilyInfo employee={employee} />
      </div>
    </main>
  );
}
