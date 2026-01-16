// services/assignmentService.js
import { getEmployees } from './employeeService';

// Trạng thái công việc
export const STATUS = {
  NOT_ASSIGNED: 'Chưa nhận việc',
  IN_PROGRESS: 'Đang thực hiện',
  COMPLETED: 'Hoàn thành',
  OVERDUE: 'Quá hạn',
};

// Dữ liệu giả lập assignments
const ASSIGNMENTS = [
  {
    id: 1,
    employeeId: 1,
    taskName: 'Lập báo cáo tháng 1',
    assignedDate: '2026-01-01', // ngày giao việc
    deadline: '2026-01-10',
    status: STATUS.COMPLETED,
  },
  {
    id: 2,
    employeeId: 2,
    taskName: 'Cập nhật hệ thống IT',
    assignedDate: '2026-01-05',
    deadline: '2026-01-15',
    status: STATUS.IN_PROGRESS,
  },
  {
    id: 3,
    employeeId: 3,
    taskName: 'Kiểm toán sổ sách Q4',
    assignedDate: '2025-12-28',
    deadline: '2026-01-05',
    status: STATUS.OVERDUE,
  },
  {
    id: 4,
    employeeId: 4,
    taskName: 'Chuẩn bị báo giá khách hàng',
    assignedDate: '2026-01-08',
    deadline: '2026-01-20',
    status: STATUS.NOT_ASSIGNED,
  },
  {
    id: 5,
    employeeId: 5,
    taskName: 'Tuyển dụng nhân viên mới',
    assignedDate: '2026-01-06',
    deadline: '2026-01-18',
    status: STATUS.IN_PROGRESS,
  },
];

// Lấy tất cả assignments kèm thông tin nhân viên
export const getAssignments = async () => {
  const employees = await getEmployees();
  const result = ASSIGNMENTS.map((a) => {
    const employee = employees.find((e) => e.id === a.employeeId);
    return {
      ...a,
      employeeName: employee?.name || 'Không xác định',
      employeeCode: employee?.employeeCode || 'N/A',
      department: employee?.department || 'N/A',
    };
  });
  return Promise.resolve(result);
};

// Lấy assignment theo nhân viên
export const getAssignmentsByEmployeeId = async (employeeId) => {
  const assignments = await getAssignments();
  return assignments.filter((a) => a.employeeId === Number(employeeId));
};

// Thêm assignment mới
export const addAssignment = async ({ employeeId, taskName, assignedDate, deadline, status }) => {
  const newAssignment = {
    id: ASSIGNMENTS.length + 1,
    employeeId: Number(employeeId),
    taskName,
    assignedDate,
    deadline,
    status: status || STATUS.NOT_ASSIGNED,
  };
  ASSIGNMENTS.push(newAssignment);
  return Promise.resolve(newAssignment);
};

// Cập nhật trạng thái assignment
export const updateAssignmentStatus = async (id, status) => {
  const assignment = ASSIGNMENTS.find((a) => a.id === Number(id));
  if (assignment) {
    assignment.status = status;
    return Promise.resolve(assignment);
  }
  return Promise.resolve(null);
};
