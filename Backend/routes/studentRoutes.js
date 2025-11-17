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


module.exports = router;
