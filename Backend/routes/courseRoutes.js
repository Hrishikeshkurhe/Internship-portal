const express = require("express");
const router = express.Router();
const { getCourses, addCourse } = require("../controllers/courseController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Public: Get all courses
router.get("/", getCourses);

// Admin: Add a new internship (course)
router.post("/", protect, allowRoles("admin"), addCourse);

module.exports = router;
