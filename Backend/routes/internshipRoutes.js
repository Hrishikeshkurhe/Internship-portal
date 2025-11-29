const express = require("express");
const router = express.Router();
const {
  getInternships,
  addInternship,
  updateInternship,
  deleteInternship,
  getAllStudentDetails,
} = require("../controllers/internshipController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// ✅ Public route (students can view)
router.get("/", getInternships);

// ✅ Admin-only routes
router.post("/", protect, allowRoles("admin"), addInternship);
router.put("/:id", protect, allowRoles("admin"), updateInternship);
router.delete("/:id", protect, allowRoles("admin"), deleteInternship);
router.get("/admin/all-students", protect, allowRoles("admin"), getAllStudentDetails);
module.exports = router;
