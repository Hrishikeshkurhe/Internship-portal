const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Import final admin controller
const {
  getAllForms,
  updateStatus,
  editForm
} = require("../controllers/adminController");

const Internship = require("../models/internship");


// ====================================================================
// 📌 GET ALL INTERNSHIP FORMS
// ====================================================================
router.get("/forms", protect, allowRoles("admin"), getAllForms);


// ====================================================================
// 📌 ENROLL COUNTS (GROUP BY DOMAIN)
// ====================================================================
router.get("/enroll-counts", protect, allowRoles("admin"), async (req, res) => {
  try {
    const counts = await Internship.aggregate([
      {
        $group: {
          _id: "$internshipDomain",
          totalStudents: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(counts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch enroll counts",
      error: err.message
    });
  }
});


// ====================================================================
// 📌 APPROVE / REJECT + SEND EMAIL
// ====================================================================
router.put("/status/:id", protect, allowRoles("admin"), updateStatus);


// ====================================================================
// 📌 EDIT APPLICATION FORM
// ====================================================================
router.put("/edit/:id", protect, allowRoles("admin"), editForm);


module.exports = router;
