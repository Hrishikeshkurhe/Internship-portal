const express = require("express");
const router = express.Router();
const Internship = require("../models/internship");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { getAllStudentDetails } = require("../controllers/internshipController");

// ----------------------------------------------------
// 1️⃣ Get ALL student internship records (Admin Panel)
// ----------------------------------------------------
router.get("/all", protect, allowRoles("admin"), getAllStudentDetails);

// ----------------------------------------------------
// 2️⃣ Get UNIQUE student names for dropdown
// ----------------------------------------------------
router.get("/students", protect, allowRoles("admin"), async (req, res) => {
  try {
    const students = await Internship.distinct("name");
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------------------
// 3️⃣ Get domains applied by selected student
// ----------------------------------------------------
router.get("/domains/:name", protect, allowRoles("admin"), async (req, res) => {
  try {
    const { name } = req.params;
    const domains = await Internship.find({ name }).select("internshipDomain");
    res.json(domains);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
