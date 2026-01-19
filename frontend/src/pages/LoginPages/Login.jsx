// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6fbfb] relative overflow-hidden">
      {/* nền gradient nhẹ như ảnh */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-teal-50/70 blur-3xl" />
      </div>

      <div className="relative w-[560px] max-w-[92vw]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_18px_60px_-30px_rgba(0,0,0,0.25)] border border-teal-100/70 overflow-hidden">
          {/* Top accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-300" />

          <form onSubmit={handleSubmit} className="px-10 py-10">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center">
                {/* icon “cờ” */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-teal-600"
                >
                  <path
                    d="M6 3v18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 4h10l-1.5 3L16 10H6V4Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>

            <h2 className="mt-4 text-center text-[22px] font-extrabold text-slate-900">
              Đăng nhập hệ thống
            </h2>
            <p className="mt-1 text-center text-sm text-slate-500">
              Quản lý nhân sự &amp; Tiền lương
            </p>

            {/* pill */}
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                CỔNG ĐĂNG NHẬP CHUNG
              </span></div>

            {/* error */}
            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {String(error)}
              </div>
            )}

            {/* Username */}
            <div className="mt-6">
              <label className="block text-xs font-semibold text-slate-600">
                Tên đăng nhập / Email
              </label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {/* user icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <input
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200/60 focus:border-teal-400"
                  placeholder="nhanvien@congty.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-600">
                  Mật khẩu
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                  onClick={() => alert("Chức năng quên mật khẩu (demo UI)")}
                >
                  Quên mật khẩu?
                </button>
              </div>

              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {/* lock icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17 11V8a5 5 0 0 0-10 0v3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    /><path
                      d="M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-11 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200/60 focus:border-teal-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* eye */}
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="toggle password"
                >
                  {showPassword ? (
                    // eye-off
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3l18 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6 10.6A2.5 2.5 0 0 0 14 14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7.5 7.8C5.1 9.1 3.5 11 3 12c1 2 4.8 7 9 7 1.6 0 3.1-.5 4.4-1.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.3 5.3C10.1 5.1 11 5 12 5c4.2 0 8 5 9 7-.4.9-1.4 2.4-2.8 3.8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    // eye
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 12c1-2 4.8-7 9-7s8 5 9 7c-1 2-4.8 7-9 7s-8-5-9-7Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 15a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-teal-600 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_25px_-12px_rgba(13,148,136,0.65)] hover:bg-teal-700 active:scale-[0.99] transition"
            >
              Đăng nhập <span className="ml-1">→</span>
            </button>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Chưa có tài khoản?{" "}
              <span className="font-semibold text-slate-700">
                Liên hệ bộ phận HR
              </span>
            </p>
          </form>
        </div>

        {/* Footer links dưới card */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Hệ thống hoạt động bình thường
          </span>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            className="hover:text-slate-700"
            onClick={() => alert("Điều khoản sử dụng (demo UI)")}
          >
            Điều khoản sử dụng
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            className="hover:text-slate-700"
            onClick={() => alert("Hỗ trợ kỹ thuật (demo UI)")}
          >
            Hỗ trợ kỹ thuật
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;