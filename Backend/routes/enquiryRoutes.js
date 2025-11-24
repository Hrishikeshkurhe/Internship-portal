const express = require("express");
const router = express.Router();
const Enquiry = require("../models/enquiry");
const { sendEmail } = require("../utils/sendEmail"); 

// 📌 Save enquiry (PUBLIC ROUTE)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone , message } = req.body;

    const enquiry = new Enquiry({ name, email, phone ,  message });
    await enquiry.save();

    res.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (err) {
    console.error("ENQUIRY SAVE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Fetch all enquiries (ADMIN)
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.log("ENQUIRY FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// 📌 Mark as viewed
router.put("/:id/view", async (req, res) => {
  try {
    await Enquiry.findByIdAndUpdate(req.params.id, { viewed: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.patch("/:id/view", async (req, res) => {
  try {
    await Enquiry.findByIdAndUpdate(req.params.id, { status: "Viewed" });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

router.put("/:id/view", async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    console.log("📨 Marking as viewed for email:", enquiry.email);
    console.log("📨 MESSAGE:", enquiry.message);

    enquiry.viewed = true;
    enquiry.status = "Viewed";
    await enquiry.save();

    // Send email notification
    const { sendEmail } = require("../utils/sendEmail");

    const emailSent = await sendEmail(
      enquiry.email,
      "Your enquiry has been reviewed",
      `<p>Hello <b>${enquiry.name}</b>,</p>
       <p>Your enquiry has been viewed by our team. We will get back to you soon.</p>
       <br>
       <p>Thank you,<br>ClickInnovate Team</p>`
    );

    console.log("📧 Email send result:", emailSent);
    console.log("User email:", enquiry.email);
console.log("ENV EMAIL:", process.env.EMAIL_USER);
console.log("ENV PASS:", process.env.EMAIL_PASS ? "Loaded" : "NOT loaded");


    res.json({ success: true });
  } catch (err) {
    console.error("VIEW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
