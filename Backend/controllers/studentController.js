const Internship = require("../models/internship");
const User = require("../models/user");
const AvailableInternship = require("../models/AvailableInternship");
// ✅ POST /api/student/form
exports.createInternship = async (req, res) => {
  try {
    const { name, email, phone, college, branch, year, internshipDomain } = req.body;

    // ✅ Get resume file (if uploaded)
    const resumeFile = req.file ? req.file.filename : null;

    // Debug logs
    console.log("🟦 Incoming data:", req.body);
    console.log("📎 Uploaded Resume:", resumeFile);
    console.log("🟧 Logged in user:", req.user?.email);

    // Validation
    if (!name || !email || !phone || !college || !branch || !year || !internshipDomain) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if student already applied for same domain
    const existing = await Internship.findOne({ email, internshipDomain });
    if (existing) {
      return res.status(400).json({ message: "You already applied for this internship." });
    }

    // ✅ Create new application
    const internship = await Internship.create({
      name,
      email,
      phone,
      college,
      branch,
      year,
      internshipDomain,
      status: "Pending",
      resume: resumeFile, // ✅ Store resume file name
    });

    console.log("✅ Internship created:", internship);
    return res.status(201).json(internship);
  } catch (err) {
    console.error("💥 Server error in createInternship:", err);
    res.status(500).json({
      message: "Server error while applying internship",
      error: err.message,
    });
  }
};

// ✅ GET /api/student/my-form
exports.getMyForm = async (req, res) => {
  try {
    const email = req.user?.email;
    const { domain } = req.query;

    let query = { email };
    if (domain) query.internshipDomain = domain;

    const form = await Internship.findOne(query);
    if (!form) return res.status(404).json({ message: "Form not found" });

    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/student/applied
exports.getAppliedInternships = async (req, res) => {
  try {
    const email = req.user?.email;
    const internships = await Internship.find({ email }).sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

//feesPay
// feesPay
// feesPay
exports.updatePayment = async (req, res) => {
  try {
    const { internshipId, userPaidFees } = req.body;
    const userEmail = req.user?.email; // From JWT

    if (!internshipId || !userEmail) {
      return res.status(400).json({ message: "Missing user or internship ID" });
    }

    // Find the saved student form
    const form = await Internship.findOne({
      _id: internshipId,
      email: userEmail,
    });

    if (!form) {
      return res.status(404).json({ message: "Student form not found" });
    }

    // Find internship to get total fees
    const internship = await AvailableInternship.findOne({
      title: form.internshipDomain,
    });

    if (!internship) {
      return res.status(404).json({ message: "Internship details not found" });
    }

    const totalFees = Number(internship.fees);
    const alreadyPaid = Number(form.userPaidFees || 0);
    const newPayment = Number(userPaidFees || 0);

    // ⛔ Prevent invalid payment
    if (newPayment <= 0) {
      return res.status(400).json({ message: "Payment must be greater than 0" });
    }

    // Remaining balance
    const remaining = totalFees - alreadyPaid;

    // ⛔ Prevent overpayment beyond remaining fees
    if (newPayment > remaining) {
      return res.status(400).json({
        message: `Payment exceeds remaining fees. You can pay maximum ₹${remaining}.`,
      });
    }

    // 💰 Add new payment to total paid
    form.userPaidFees = alreadyPaid + newPayment;

    // Update payment status
    form.paymentStatus =
      form.userPaidFees >= totalFees ? "Completed" : "Pending";

    await form.save();

    res.json({
      message: "Payment updated successfully",
      totalFees,
      userPaidFees: form.userPaidFees,
      remainingFees: totalFees - form.userPaidFees,
      paymentStatus: form.paymentStatus,
    });
  } catch (err) {
    console.log("PAYMENT ERROR:", err);
    res.status(500).json({ message: "Payment update failed", error: err.message });
  }
};





