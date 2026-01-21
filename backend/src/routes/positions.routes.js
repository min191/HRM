const express = require("express");
const router = express.Router();

const c = require("../controllers/positions.controller");

// CRUD
router.get("/", c.listPositions);        // GET  /api/positions
router.get("/:id", c.getPositionById);   // GET  /api/positions/:id
router.post("/", c.createPosition);      // POST /api/positions
router.put("/:id", c.updatePosition);    // PUT  /api/positions/:id
router.delete("/:id", c.deletePosition); // DELETE /api/positions/:id

module.exports = router;
