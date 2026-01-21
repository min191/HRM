import React, { useState, useEffect, useContext } from "react";

import { getApprovalsByEmployeeId, createApproval } from "../../services/approvalsService";
import { getEmployeeById } from "../../services/employeeService";
import { AuthContext } from "../../auth/AuthContext";

import EmployeeInfo from "../../components/ApprovalsEmployee/EmployeeInfo";
import AddRequestForm from "../../components/ApprovalsEmployee/AddRequestForm";
import RequestCard from "../../components/ApprovalsEmployee/RequestCard";

export default function ApprovalsEmployee() {
  const { user: currentUser } = useContext(AuthContext);
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);

  const [newRequest, setNewRequest] = useState({
    type: "",
    reason: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    history: [],
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchEmployee();
      fetchApprovals();
    }
  }, [currentUser]);

  const fetchEmployee = async () => {
    const data = await getEmployeeById(currentUser.id);
    setEmployee(data);
  };

  const fetchApprovals = async () => {
    setLoading(true);
    const data = await getApprovalsByEmployeeId(currentUser.id);
    setApprovals(data);
    setLoading(false);
  };

  const handleChange = (e) =>
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newRequest.type || !newRequest.startDate || !newRequest.endDate || !newRequest.reason) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newApproval = {
      ...newRequest,
      employeeId: currentUser.id,
      history: [{ time: new Date().toISOString().split("T")[0], text: "Tạo yêu cầu" }],
    };

    await createApproval(newApproval);
    setNewRequest({
      type: "",
      reason: "",
      startDate: "",
      endDate: "",
      status: "Pending",
      history: [],
    });

    setShowPopup(false);
    fetchApprovals();
  };

  if (!currentUser || !employee) {
    return <p className="p-6 text-sm text-gray-500">Đang tải thông tin nhân viên...</p>;
  }

  return (
    <aside className="flex flex-col h-full w-full max-w-md lg:max-w-lg bg-white border-l border-border">

      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Yêu cầu nghỉ phép
        </h2>

        <button
          onClick={() => setShowPopup(true)}
          className="
            bg-primary text-white
            px-4 py-2 rounded-lg text-sm font-medium
            hover:bg-primaryDark transition
            shadow-sm
          "
        >
          + Thêm mới
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm bg-backgroundLight">
        <EmployeeInfo employee={employee} />

        {loading ? (
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : approvals.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            Chưa có yêu cầu nào
          </div>
        ) : (
          <div className="space-y-4">
            {approvals.map((item) => (
              <RequestCard key={item.id} request={item} />
            ))}
          </div>
        )}
      </div>

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)} // click ngoài là đóng
        >
          <div
            className="
        bg-white rounded-2xl w-full max-w-sm p-6
        shadow-xl animate-fade-in
      "
            onClick={(e) => e.stopPropagation()} // chặn click lan vào overlay
          >
            <AddRequestForm
              request={newRequest}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

    </aside>
  );
}
