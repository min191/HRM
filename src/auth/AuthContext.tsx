import React, { createContext, useContext, useState, ReactNode } from "react";
import { login as mockLogin } from "../services/userService";

/* ====== TYPES ====== */
export interface User {
  id: number;
  username: string;
  role: "admin" | "HR" | "ketoan" | "nhanvien";
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

/* ====== CONTEXT ====== */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ====== PROVIDER ====== */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  /* LOGIN */
  const login = async (username: string, password: string) => {
    const res = await mockLogin(username, password);
    setUser(res);
    localStorage.setItem("user", JSON.stringify(res));
  };

  /* LOGOUT */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ====== HOOK ====== */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
