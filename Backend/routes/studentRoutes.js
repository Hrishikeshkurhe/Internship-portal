const express = require("express");
const router = express.Router();
const {
  createInternship,
  getMyForm,
  getAppliedInternships,
  updatePayment,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const multer = require("multer");

// ✅ Configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store resumes
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Student routes
router.post(
  "/form",
  protect,
  allowRoles("student"),
  upload.single("resume"), // ✅ this handles resume upload
  createInternship
);

router.get("/my-form", protect, allowRoles("student"), getMyForm);
router.get("/applied", protect, allowRoles("student"), getAppliedInternships);
router.put(
  "/update-payment",
  protect,
  allowRoles("student"),
  updatePayment
);

// ⭐ PUBLIC ROUTE — Get ALL students who applied
router.get("/all", async (req, res) => {
  try {
    const Internship = require("../models/internship");

    const data = await Internship.find().sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.error("GET ALL STUDENTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
