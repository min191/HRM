import express from "express";

const router = express.Router();

// ví dụ route
router.post("/login", (req, res) => {
  res.json({ message: "Login API" });
});

export default router; // 👈 BẮT BUỘC
