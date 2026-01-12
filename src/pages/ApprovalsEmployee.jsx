import React, { useState, useEffect, useContext } from "react";

import { getApprovalsByEmployeeId, createApproval } from "../services/approvalsService";
import { getEmployeeById } from "../services/employeeService";
import { AuthContext } from "../auth/AuthContext";

import EmployeeInfo from "../components/ApprovalsEmployee/EmployeeInfo";
import AddRequestForm from "../components/ApprovalsEmployee/AddRequestForm";
import RequestCard from "../components/ApprovalsEmployee/RequestCard";

export default function ApprovalsEmployee() {
  const { user: currentUser } = useContext(AuthContext);
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);

  // State cho form mới
  const [newRequest, setNewRequest] = useState({
    type: "",
    reason: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    history: [],
  });

  const [showPopup, setShowPopup] = useState(false); // popup state

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

    // Thêm field history khi tạo mới
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

    setShowPopup(false); // ẩn popup sau khi submit
    fetchApprovals();
  };

  if (!currentUser || !employee) return <p>Đang tải thông tin nhân viên...</p>;

  return (
    <aside className="w-[400px] bg-background border-l border-border flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
        <EmployeeInfo employee={employee} />

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Yêu cầu nghỉ phép</h2>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-primary text-white px-3 py-1 rounded hover:bg-primaryDark transition"
          >
            Thêm mới
          </button>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : approvals.length === 0 ? (
          <p>Chưa có yêu cầu nào</p>
        ) : (
          approvals.map((item) => <RequestCard key={item.id} request={item} />)
        )}

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[350px] relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <AddRequestForm
                request={newRequest}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
