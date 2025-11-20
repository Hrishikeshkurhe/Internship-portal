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

exports.getFeesReport = async (req, res) => {
  try {
    // 1. Fetch all internships
    const internships = await Internship.find();

    // 2. Group by domain
    const report = {};

    internships.forEach((i) => {
      const domain = i.internshipDomain;

      if (!report[domain]) {
        report[domain] = {
          domain,
          fees: i.fees || 0, // ensure fees exist
          totalStudents: 0,
          totalFeesCollected: 0
        };
      }

      // Count student
      report[domain].totalStudents++;

      // Add fees collected
      report[domain].totalFeesCollected += i.fees ? Number(i.fees) : 0;
    });

    return res.json(Object.values(report));
  } catch (err) {
    console.error("Fees Report Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getStudentFormsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const forms = await Internship.find({ email }).sort({ createdAt: -1 });

    if (!forms.length) {
      return res.status(404).json({ message: "No forms found for this student" });
    }

    res.json(forms);
  } catch (err) {
    console.error("getStudentFormsByEmail error:", err);
    res.status(500).json({
      message: "Failed to fetch student applications",
      error: err.message,
    });
  }
};

// Mentor Section //

exports.createMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password required" });
    }

    // ensure email not used
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role: "subadmin" });
    await user.save();

    // optional: don't return password
    const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role };
    res.json(safeUser);
  } catch (err) {
    console.error("createMentor error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit mentor (admin only)
exports.editMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // only allow editing mentors (subadmin) or admin can edit any user
    // keep simple: admin edits allowed
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password; // pre-save will hash

    await user.save();

    const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role };
    res.json(safeUser);
  } catch (err) {
    console.error("editMentor error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// add to adminController.js
exports.listMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "subadmin" }).select("-password");
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
