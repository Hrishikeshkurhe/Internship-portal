const express = require("express");
const router = express.Router();
const User = require("../models/user");   
const { getAnalytics } = require("../controllers/analyticsController");
const { getFeesReport , createMentor, editMentor , listMentors } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");



const allowRoles = require("../middleware/roleMiddleware");

// Import final admin controller
const {
  getAllForms,
  updateStatus,
  editForm,
    getStudentFormsByEmail, 
    adminUpdatePayment , 
} = require("../controllers/adminController");

const Internship = require("../models/internship");


// ====================================================================
// 📌 GET ALL INTERNSHIP FORMS
// ====================================================================
router.get("/forms", protect, allowRoles("admin"), getAllForms);

// ====================================================================
// 📌 ADMIN UPDATE PAYMENT
// ====================================================================
router.put(
  "/update-payment",
  protect,
  allowRoles("admin"),
  adminUpdatePayment
);


router.get("/analytics", protect, allowRoles("admin"), getAnalytics);

router.get("/fees-report", protect, allowRoles("admin"), async (req, res) => {
  try {
    // 1. Get all internships with domain + fees
    const internships = await Internship.find().select("internshipDomain fees");

    // 2. Count students per internship domain
    const counts = await Internship.aggregate([
      {
        $group: {
          _id: "$internshipDomain",
          totalStudents: { $sum: 1 }
        }
      }
    ]);

    // 3. Merge fees + student count
    const report = internships.map((intern) => {
      const match = counts.find((c) => c._id === intern.internshipDomain);

      return {
        internshipDomain: intern.internshipDomain,
        fees: intern.fees,
        totalStudents: match ? match.totalStudents : 0,
        totalCollected: match ? match.totalStudents * intern.fees : 0,
      };
    });

    res.json(report);

  } catch (err) {
    console.error("Fees Report Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

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
// 📌 FEES REPORT
// ====================================================================
router.get("/fees-report", protect, allowRoles("admin"), async (req, res) => {
  try {
    const applications = await Internship.find()
      .select("name email internshipDomain userPaidFees paymentStatus");

    // Get all internship master data (fees)
    const masterData = await require("../models/AvailableInternship").find()
      .select("title fees");

    const report = applications.map((app) => {
      const match = masterData.find(
        (m) => m.title === app.internshipDomain
      );

      const totalFees = match?.fees || 0;
      const paid = app.userPaidFees || 0;
      const remaining = totalFees - paid;

      return {
        name: app.name,
        email: app.email,
        internship: app.internshipDomain,
        totalFees,
        paid,
        remainingFees: remaining < 0 ? 0 : remaining,
        status: app.paymentStatus || "Pending",
      };
    });

    res.json(report);

  } catch (err) {
    console.error("Fees Report Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ ALL FORMS FOR ONE STUDENT (GROUP BY EMAIL)
router.get(
  "/forms/email/:email",
  protect,
  allowRoles("admin"),
  getStudentFormsByEmail
);




// ====================================================================
// 📌 APPROVE / REJECT + SEND EMAIL
// ====================================================================
router.put("/status/:id", protect, allowRoles("admin"), updateStatus);


// ====================================================================
// 📌 EDIT APPLICATION FORM
// ====================================================================
router.put("/edit/:id", protect, allowRoles("admin"), editForm);

// Admin can create mentors
router.post("/mentors", protect, allowRoles("admin"), createMentor);

// Admin can edit mentors (or any user by id)
router.put("/mentors/:id", protect, allowRoles("admin"), editMentor);


router.get("/mentors", protect, allowRoles("admin"), listMentors);

router.get("/mentors/:id/interns", protect, allowRoles("subadmin", "admin"), async (req, res) => {
  const mentor = await User.findById(req.params.id);
  if (!mentor) return res.status(404).json({ message: "Mentor not found" });

  if (!mentor.courseAssigned) return res.json([]);

  const interns = await Internship.find({
    internshipDomain: mentor.courseAssigned,
  });

  res.json(interns);
});

router.get("/public-mentors", async (req, res) => {
  try {
    const mentors = await User.find({ role: "subadmin" })
      .select("name email courseAssigned");
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Failed to load mentors" });
  }
});
// DELETE mentor
router.delete("/mentors/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json({ message: "Mentor deleted successfully" });
  } catch (err) {
    console.error("Delete mentor error", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

