// src/config/env.js
require("dotenv").config();

function must(name, fallback = undefined) {
  const v = process.env[name] ?? fallback;
  if (v === undefined || v === "") throw new Error(`Missing env: ${name}`);
  return v;
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 4000),

  DB_HOST: must("DB_HOST", "localhost"),
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_USER: must("DB_USER", "root"),
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: must("DB_NAME", "datahrm"),

  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  JWT_SECRET: process.env.JWT_SECRET || "change_me",
};

module.exports = env;