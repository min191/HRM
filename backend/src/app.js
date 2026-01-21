require("dotenv").config();
const express = require("express");
const app = express();

// Import các middleware và routes
const requireAuth = require("./middleware/requireAuth");  // Import middleware xác thực
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// Middleware để xử lý JSON body
app.use(express.json());

// Health check route (Không cần xác thực)
app.get("/health", (req, res) => res.json({ ok: true }));

// Import tất cả các route từ thư mục routes
app.use("/api", require("./routes"));  // Đây là điểm chung cho tất cả các route

// Các route yêu cầu xác thực (sử dụng requireAuth middleware)
app.use("/api/protected-route", requireAuth, (req, res) => {
  res.json({ success: true, message: "You have access to this protected route!" });
});

// Middleware xử lý lỗi 404 và các lỗi khác
app.use(notFound);
app.use(errorHandler);

module.exports = app;  // Export app để sử dụng trong server.js
