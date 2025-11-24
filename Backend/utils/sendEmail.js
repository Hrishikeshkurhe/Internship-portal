const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, html) => {
  console.log("📧 Email Function Triggered");
  console.log("📩 TO:", to);
  console.log("📩 SUBJECT:", subject);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
        logger: true,      // add
  debug: true   
    });

    console.log("🔁 Verifying transporter...");
    await transporter.verify();
    console.log("✅ Transporter verified");

    const info = await transporter.sendMail({
      from: `"ClickInnovate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📤 EMAIL SENT → Message ID:", info.messageId);
    return true;

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    return false;
  }
};
