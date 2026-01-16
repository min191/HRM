import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ProfileInfo from '../../components/EmployeesDetail/ProfileInfo';
import EducationInfo from '../../components/EmployeesDetail/EducationInfo';
import SocialInfo from '../../components/EmployeesDetail/SocialInfo';
import WorkInfo from '../../components/EmployeesDetail/WorkInfo';
import FamilyInfo from '../../components/EmployeesDetail/FamilyInfo';

import { getEmployeeById } from '../../services/employeeService';

function EmployeesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      const data = await getEmployeeById(id);
      setEmployee(data);
      setLoading(false);
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center text-text-muted">
        Đang tải thông tin nhân viên...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container mx-auto p-6">
        <p>Không tìm thấy nhân viên</p>
        <button
          onClick={() => navigate('/employees')}
          className="text-primary underline mt-2"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ProfileInfo employee={employee} />
      <EducationInfo employee={employee} />
      <SocialInfo employee={employee} />
      <WorkInfo employee={employee} />
      <FamilyInfo />
    </div>
  );
}

export default EmployeesDetail;
