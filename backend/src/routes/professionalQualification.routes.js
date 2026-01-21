const express = require("express");
const router = express.Router();
const controller = require("../controllers/professionalQualifications.controller");
const authMiddleware = require("../middleware/requireAuth");

// Protecting routes with authentication middleware
router.use(authMiddleware);

// CRUD operations for Professional Qualifications
router.get("/", controller.list);          // GET /api/professional-qualifications
router.get("/:id", controller.getById);    // GET /api/professional-qualifications/:id
router.post("/", controller.create);       // POST /api/professional-qualifications
router.put("/:id", controller.update);     // PUT /api/professional-qualifications/:id
router.delete("/:id", controller.remove);  // DELETE /api/professional-qualifications/:id

module.exports = router;
