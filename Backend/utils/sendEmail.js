const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, html) => {
  console.log("📧 Preparing to send email...");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Mail transporter verified successfully");

    const info = await transporter.sendMail({
      from: `"Internship Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent successfully to:", to);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return false;
  }
};
