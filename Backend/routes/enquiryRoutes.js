const express = require("express");
const router = express.Router();
const Enquiry = require("../models/enquiry");
const {sendEmail} = require("../utils/sendEmail");
const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE ENQUIRY
router.post("/", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit enquiry" });
  }
});

// GET ALL ENQUIRIES
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
});

// MARK AS VIEWED + SEND EMAIL
router.put("/:id/view", protect, role("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    // Update status
    enquiry.viewed = true;
    enquiry.status = "Viewed";
    await enquiry.save();

    // Send email to user
    const subject = "Your enquiry has been viewed";
    const html = `
      <h2>Hello ${enquiry.name},</h2>
      <p>Your enquiry has been <b>reviewed</b> by the support team.</p>
      <p>We will get back to you shortly.</p>
      <br>
      <p>Thank you,<br/><b>ClickInnovate Team</b></p>
    `;

    await sendEmail(enquiry.email, subject, html);

    res.json({ message: "Marked as viewed and email sent!" });
  } catch (err) {
    console.error("View update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE ENQUIRY
router.delete("/:id", async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
});

module.exports = router;
