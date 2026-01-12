import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface Props {
  roles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ roles }) => {
  const { user } = useAuth();

  // ❌ Chưa đăng nhập → đá về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Có đăng nhập nhưng sai quyền
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Hợp lệ
  return <Outlet />;
};

export default ProtectedRoute;
