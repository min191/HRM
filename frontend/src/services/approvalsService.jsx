// services/approvalsService.js
import { getEmployees } from "./employeeService";

// Dữ liệu mẫu các approvals
const APPROVALS = [
  {
    id: 1,
    employeeId: 1,
    type: "Nghỉ phép",
    reason: "Đi khám sức khỏe",
    startDate: "2026-01-20",
    endDate: "2026-01-22",
    status: "Pending",
    createdAt: "2026-01-10",
    history: [{ time: "2026-01-10", text: "Tạo yêu cầu" }],
  },
  {
    id: 2,
    employeeId: 2,
    type: "Đi công tác",
    reason: "Hội thảo CNTT",
    startDate: "2026-01-25",
    endDate: "2026-01-28",
    status: "Approved",
    createdAt: "2026-01-08",
    history: [
      { time: "2026-01-08", text: "Tạo yêu cầu" },
      { time: "2026-01-09", text: "Được duyệt" },
    ],
  },
  {
    id: 3,
    employeeId: 5,
    type: "Nghỉ phép",
    reason: "Gia đình",
    startDate: "2026-01-15",
    endDate: "2026-01-17",
    status: "Rejected",
    createdAt: "2026-01-09",
    history: [
      { time: "2026-01-09", text: "Tạo yêu cầu" },
      { time: "2026-01-10", text: "Bị từ chối" },
    ],
  },
  {
    id: 4,
    employeeId: 3,
    type: "Nghỉ phép",
    reason: "Đi du lịch",
    startDate: "2026-02-01",
    endDate: "2026-02-05",
    status: "Pending",
    createdAt: "2026-01-12",
    history: [{ time: "2026-01-12", text: "Tạo yêu cầu" }],
  },
  {
    id: 5,
    employeeId: 4,
    type: "Đi công tác",
    reason: "Họp khách hàng",
    startDate: "2026-02-03",
    endDate: "2026-02-04",
    status: "Approved",
    createdAt: "2026-01-11",
    history: [
      { time: "2026-01-11", text: "Tạo yêu cầu" },
      { time: "2026-01-12", text: "Được duyệt" },
    ],
  },
  {
    id: 6,
    employeeId: 6,
    type: "Nghỉ phép",
    reason: "Việc cá nhân",
    startDate: "2026-02-10",
    endDate: "2026-02-12",
    status: "Pending",
    createdAt: "2026-01-13",
    history: [{ time: "2026-01-13", text: "Tạo yêu cầu" }],
  },
  {
    id: 7,
    employeeId: 7,
    type: "Nghỉ phép",
    reason: "Khám sức khỏe định kỳ",
    startDate: "2026-02-15",
    endDate: "2026-02-16",
    status: "Approved",
    createdAt: "2026-01-14",
    history: [
      { time: "2026-01-14", text: "Tạo yêu cầu" },
      { time: "2026-01-15", text: "Được duyệt" },
    ],
  },
  {
    id: 8,
    employeeId: 8,
    type: "Đi công tác",
    reason: "Tham gia hội nghị Marketing",
    startDate: "2026-02-20",
    endDate: "2026-02-22",
    status: "Rejected",
    createdAt: "2026-01-15",
    history: [
      { time: "2026-01-15", text: "Tạo yêu cầu" },
      { time: "2026-01-16", text: "Bị từ chối" },
    ],
  },
];

// Gắn employee và duration
const attachEmployee = async (approval) => {
  const employees = await getEmployees();
  const employee = employees.find((e) => e.id === approval.employeeId) || {};
  const duration = `${approval.startDate} → ${approval.endDate}`;
  return { ...approval, employee, duration };
};

// Lấy tất cả approvals (giữ nguyên thứ tự trong APPORVALS)
export const getApprovals = async () => {
  const approvalsWithEmployee = await Promise.all(
    APPROVALS.map(async (approval) => await attachEmployee(approval))
  );
  return approvalsWithEmployee;
};

// Lấy approval theo ID
export const getApprovalById = async (id) => {
  const approval = APPROVALS.find((a) => a.id === Number(id));
  if (!approval) return null;
  return await attachEmployee(approval);
};

// Tạo approval mới
export const createApproval = async (approvalData) => {
  const newApproval = {
    id: APPROVALS.length + 1,
    ...approvalData,
    status: "Pending",
    createdAt: new Date().toISOString().split("T")[0],
    history: [{ time: new Date().toISOString().split("T")[0], text: "Tạo yêu cầu" }],
  };
  APPROVALS.push(newApproval);
  return await attachEmployee(newApproval);
};

// Cập nhật trạng thái approval
export const updateApprovalStatus = async (id, status, reason = "") => {
  const approval = APPROVALS.find((a) => a.id === Number(id));
  if (!approval) return null;
  approval.status = status;
  if (reason) approval.reason = reason;
  approval.history.push({
    time: new Date().toISOString().split("T")[0],
    text: status === "Approved" ? "Được duyệt" : "Bị từ chối",
  });
  return await attachEmployee(approval);
};
// Lấy approvals theo employeeId
export const getApprovalsByEmployeeId = async (employeeId) => {
  const approvalsForEmployee = APPROVALS.filter(
    (a) => a.employeeId === Number(employeeId)
  );
  const approvalsWithEmployee = await Promise.all(
    approvalsForEmployee.map(async (approval) => await attachEmployee(approval))
  );
  return approvalsWithEmployee;
};
