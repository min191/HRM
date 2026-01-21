const express = require("express");
const router = express.Router();

const c = require("../controllers/tasks.controller");

// CRUD
router.get("/", c.listTasks);        // GET  /api/tasks
router.get("/:id", c.getTaskById);   // GET  /api/tasks/:id
router.post("/", c.createTask);      // POST /api/tasks
router.put("/:id", c.updateTask);    // PUT  /api/tasks/:id
router.delete("/:id", c.deleteTask); // DELETE /api/tasks/:id

module.exports = router;
