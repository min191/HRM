// src/server.js
const http = require("http");
const app = require("./app");

const PORT = Number(process.env.PORT || 4000);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ HRM API running on: http://localhost:${PORT}`);
  console.log(`✅ Health check:       http://localhost:${PORT}/api/health`);
});

// Optional: graceful shutdown (Ctrl+C)
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed.");
    process.exit(0);
  });
});