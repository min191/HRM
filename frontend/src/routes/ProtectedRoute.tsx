import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface Props {
  roles?: string[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ roles, children }) => {
  const { user } = useAuth();

  // ❌ Chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Sai quyền
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Hợp lệ
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
