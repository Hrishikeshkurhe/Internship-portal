const express = require("express");
const router = express.Router();
const Enquiry = require("../models/enquiry");

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


module.exports = router;
