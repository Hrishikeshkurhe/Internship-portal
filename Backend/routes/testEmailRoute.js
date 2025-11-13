const express = require("express");
const router = express.Router();
const { sendEmail } = require("../utils/sendEmail");

router.get("/test-email", async (req, res) => {
  try {
    const result = await sendEmail(
      process.env.EMAIL_USER,
      "Test Email",
      "<h2>Email Test Successful</h2>"
    );

    if (result) return res.send("✅ Email sent!");
    return res.status(500).send("❌ Email sending failed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
