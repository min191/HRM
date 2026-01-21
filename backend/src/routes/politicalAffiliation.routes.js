const express = require("express");
const router = express.Router();
const politicalAffiliationController = require("../controllers/politicalAffiliation.controller");
const requireAuth = require("../middleware/requireAuth");
const requirePermission = require("../middleware/requirePermission");

router.use(requireAuth);

// Get list of political affiliations
router.get(
  "/",
  requirePermission("politicalAffiliations:read"),
  politicalAffiliationController.list
);

// Get political affiliation by ID
router.get(
  "/:id",
  requirePermission("politicalAffiliations:read"),
  politicalAffiliationController.getById
);

// Create a new political affiliation
router.post(
  "/",
  requirePermission("politicalAffiliations:create"),
  politicalAffiliationController.create
);

// Update political affiliation by ID
router.put(
  "/:id",
  requirePermission("politicalAffiliations:update"),
  politicalAffiliationController.update
);

// Delete political affiliation by ID
router.delete(
  "/:id",
  requirePermission("politicalAffiliations:delete"),
  politicalAffiliationController.remove
);

module.exports = router;
