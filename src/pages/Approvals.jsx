import React, { useState, useEffect } from "react";
import ApprovalsRequestCard from "../components/Approvals/ApprovalsRequestCard";
import ApprovalsDetailPanel from "../components/Approvals/ApprovalsDetailPanel";
import { getApprovals, updateApprovalStatus } from "../services/approvalsService";

export default function Approvals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // số item mỗi trang

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
    try {
      await updateApprovalStatus(id, "Approved");
      setApprovals((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
      );
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, status: "Approved" });
      }
    } catch (error) {
      console.error("Lỗi khi duyệt:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateApprovalStatus(id, "Rejected");
      setApprovals((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
      );
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, status: "Rejected" });
      }
    } catch (error) {
      console.error("Lỗi khi từ chối:", error);
    }
  };

  // Tính toán dữ liệu phân trang
  const totalPages = Math.ceil(approvals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApprovals = approvals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans text-gray-900">
      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Đặt chiều cao cố định và scroll bên trong */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-2rem)]">
          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : approvals.length === 0 ? (
              <p className="text-center text-gray-500">Chưa có yêu cầu phê duyệt</p>
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

            {/* Pagination */}
            {approvals.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-primary text-white" : ""
                      }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Tiếp
                </button>
              </div>
            )}
          </div>
        </div>
      </main>


      {/* Detail panel */}
      <ApprovalsDetailPanel
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
