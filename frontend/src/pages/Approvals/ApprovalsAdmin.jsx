import React, { useState, useEffect } from "react";
import ApprovalsRequestCard from "../../components/Approvals/ApprovalsRequestCard";
import ApprovalsDetailPanel from "../../components/Approvals/ApprovalsDetailPanel";
import Pagination from "../../components/common/Pagination";
import {
  getApprovals,
  updateApprovalStatus,
} from "../../services/approvalsService";

export default function ApprovalsAdmin() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const data = await getApprovals();
      setApprovals(data);
    } catch (error) {
      console.error("Lỗi khi tải approvals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await updateApprovalStatus(id, "Approved");
    setApprovals((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: "Approved" });
    }
  };

  const handleReject = async (id) => {
    await updateApprovalStatus(id, "Rejected");
    setApprovals((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: "Rejected" });
    }
  };

  const totalPages = Math.ceil(approvals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApprovals = approvals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans text-gray-900">
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              <p className="text-center text-gray-500">
                Đang tải dữ liệu...
              </p>
            ) : currentApprovals.length === 0 ? (
              <p className="text-center text-gray-500">
                Chưa có yêu cầu phê duyệt
              </p>
            ) : (
              currentApprovals.map((request) => (
                <ApprovalsRequestCard
                  key={request.id}
                  request={request}
                  onClick={() => setSelectedRequest(request)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            )}

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      <ApprovalsDetailPanel
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
