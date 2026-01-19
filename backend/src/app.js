// src/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// ===== Middlewares =====
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ===== Health check =====
const { healthCheck } = require("./config/db");

app.get("/api/health", async (req, res) => {
  try {
    const dbOk = await healthCheck();
    res.json({
      ok: true,
      service: "hrm-backend",
      db: dbOk,
      time: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ===== Routes =====
app.use("/api", routes);

// ===== 404 + Error =====
app.use(notFound);
app.use(errorHandler);

module.exports = app;