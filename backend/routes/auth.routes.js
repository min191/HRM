import express from "express";

const router = express.Router();

// test route
router.post("/login", (req, res) => {
  res.json({ message: "Auth login OK" });
});

export default router;
