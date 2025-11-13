// 📁 Backend/controllers/adminController.js

const Internship = require("../models/internship");
const { sendEmail } = require("../utils/sendEmail"); // Correct reusable email utility

// ===================================================================
// 📌 GET ALL INTERNSHIP APPLICATIONS (Admin Only)
// ===================================================================
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Internship.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===================================================================
// 📌 APPROVE / REJECT INTERNSHIP APPLICATION + SEND EMAIL
// ===================================================================
exports.updateStatus = async (req, res) => {
  try {
    const form = await Internship.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Update status
    form.status = req.body.status;
    await form.save();

    // Email content
    const subject = "Internship Application Status Update";
    const html = `
      <h2>Hello ${form.name},</h2>
      <p>Your internship application for <b>${form.internshipDomain}</b> has been 
      <b style="color:${form.status === "Approved" ? "green" : "red"}">
         ${form.status}
      </b>.</p>
      
      <p>Thank you for applying at <b>Click Innovate</b>.  
      We will contact you with further details soon.</p>

      <br/>
      <p style="font-size:12px;color:#555;">This is an automated email. Do not reply.</p>
    `;

    // Send email
    const emailSent = await sendEmail(form.email, subject, html);

    return res.json({
      message: emailSent
        ? "Status updated & Email sent successfully"
        : "Status updated (Email sending failed)",
      form,
    });

  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===================================================================
// 📌 EDIT STUDENT FORM (Admin Can Modify Application Form)
// ===================================================================
exports.editForm = async (req, res) => {
  try {
    const updatedForm = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(updatedForm);
  } catch (err) {
    console.error("❌ Error editing form:", err);
    res.status(500).json({ message: err.message });
  }
};
