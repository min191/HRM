const express = require("express");
const router = express.Router();
const politicalQualificationController = require("../controllers/professionalQualifications.controller");
const { requireAuth, requirePermission } = require("../middleware/requireAuth");

router.use(requireAuth);  // Kiểm tra xác thực token

// Đăng ký các route API cho ProfessionalQualification
router.get("/", requirePermission("professionalQualifications:read"), politicalQualificationController.list);
router.get("/:id", requirePermission("professionalQualifications:read"), politicalQualificationController.getById);
router.post("/", requirePermission("professionalQualifications:create"), politicalQualificationController.create);
router.put("/:id", requirePermission("professionalQualifications:update"), politicalQualificationController.update);
router.delete("/:id", requirePermission("professionalQualifications:delete"), politicalQualificationController.remove);

module.exports = router;
