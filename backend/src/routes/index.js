// src/routes/index.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ ok: true, message: "HRM API root" }));

router.use("/employees", require("./employees.routes"));
// sau này thêm:
// router.use("/departments", require("./departments.routes"));
// router.use("/positions", require("./positions.routes"));

module.exports = router;