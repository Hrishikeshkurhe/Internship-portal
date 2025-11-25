// 📁 Backend/controllers/adminController.js
const User = require("../models/user");
const Internship = require("../models/internship");
const AvailableInternship = require("../models/AvailableInternship"); // ✅ NEW: master internship data
const { sendEmail } = require("../utils/sendEmail");

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

    form.status = req.body.status;
    await form.save();

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

    const emailSent = await sendEmail(form.email, subject, html);

    return res.json({
      message: emailSent
        ? "Status updated & Email sent successfully"
        : "Status updated (Email sending failed)",
      form,
    });
  } catch (err) {
    console.error("Error updating status:", err);
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

// ===================================================================
// 📌 FEES REPORT BY DOMAIN (you already had this)
// ===================================================================
exports.getFeesReport = async (req, res) => {
  try {
    const internships = await Internship.find();
    const report = {};

    internships.forEach((i) => {
      const domain = i.internshipDomain;

      if (!report[domain]) {
        report[domain] = {
          domain,
          fees: i.fees || 0,
          totalStudents: 0,
          totalFeesCollected: 0,
        };
      }

      report[domain].totalStudents++;
      report[domain].totalFeesCollected += i.fees ? Number(i.fees) : 0;
    });

    return res.json(Object.values(report));
  } catch (err) {
    console.error("Fees Report Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// ===================================================================
// 📌 GET ALL FORMS OF ONE STUDENT (BY EMAIL)
// ===================================================================
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

// ===================================================================
// 📌 ADMIN: UPDATE PAYMENT FOR ANY STUDENT
// ===================================================================
// exports.adminUpdatePayment = async (req, res) => {
//   try {
//     const { internshipId, userPaidFees } = req.body;

//     if (!internshipId || userPaidFees === undefined) {
//       return res.status(400).json({ message: "internshipId and userPaidFees required" });
//     }

//     const form = await Internship.findById(internshipId);
//     if (!form) {
//       return res.status(404).json({ message: "Internship form not found" });
//     }

//     // Get TOTAL FEES from master table or from form itself
//     let totalFees = 0;

//     // First try from AvailableInternship (master)
//     const master = await AvailableInternship.findOne({
//       title: form.internshipDomain,
//     }).select("fees");

//     if (master && master.fees) {
//       totalFees = Number(master.fees);
//     } else if (form.fees) {
//       // fallback: from form
//       totalFees = Number(form.fees);
//     }

//     const paid = Number(userPaidFees);

//     if (paid < 0) {
//       return res.status(400).json({ message: "Paid amount cannot be negative" });
//     }
//     if (totalFees && paid > totalFees) {
//       return res
//         .status(400)
//         .json({ message: `Paid amount cannot be greater than total fees (${totalFees})` });
//     }

//     const remaining = totalFees ? Math.max(totalFees - paid, 0) : 0;

//     form.userPaidFees = paid;
//     form.paymentStatus = remaining === 0 && totalFees > 0 ? "Completed" : "Pending";

//     await form.save();

//     return res.json({
//       message: "Payment updated successfully",
//       totalFees,
//       paid,
//       remaining,
//       paymentStatus: form.paymentStatus,
//     });
//   } catch (err) {
//     console.error("adminUpdatePayment error:", err);
//     res.status(500).json({ message: "Payment update failed" });
//   }
// };

// ===================================================================
// 📌 MENTOR SECTION
// ===================================================================
exports.createMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role: "subadmin" });
    await user.save();

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.json(safeUser);
  } catch (err) {
    console.error("createMentor error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.editMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, courseAssigned } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password; // hashed automatically
    }

    if (courseAssigned !== undefined) {
      user.courseAssigned = courseAssigned;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      courseAssigned: user.courseAssigned,
    });
  } catch (err) {
    console.error("editMentor error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "subadmin" }).select(
      "name email courseAssigned role"
    );

    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ===================================================================
// 📌 ADMIN: UPDATE PAYMENT FOR ANY STUDENT
// ===================================================================
exports.adminUpdatePayment = async (req, res) => {
  try {
    const { internshipId, userPaidFees } = req.body;

    if (!internshipId || userPaidFees === undefined) {
      return res.status(400).json({ message: "internshipId and userPaidFees required" });
    }

    const form = await Internship.findById(internshipId);
    if (!form) {
      return res.status(404).json({ message: "Internship form not found" });
    }

    // Get total fees from AvailableInternship
    const AvailableInternship = require("../models/AvailableInternship");
    const master = await AvailableInternship.findOne({ title: form.internshipDomain });

    const totalFees = master?.fees ? Number(master.fees) : 0;
    const addedAmount = Number(userPaidFees);

    if (addedAmount <= 0) {
      return res.status(400).json({ message: "Paid amount must be greater than 0" });
    }

    const previousPaid = Number(form.userPaidFees || 0);
    const newPaidTotal = previousPaid + addedAmount;

    if (newPaidTotal > totalFees) {
      return res.status(400).json({
        message: `Total payment cannot exceed total fees (₹${totalFees})`,
      });
    }

    const remaining = totalFees - newPaidTotal;

    form.userPaidFees = newPaidTotal;
    form.paymentStatus = remaining === 0 ? "Completed" : "Pending";

    await form.save();

    res.json({
      message: "Payment updated successfully",
      totalFees,
      previousPaid,
      addedAmount,
      newPaidTotal,
      remaining,
      paymentStatus: form.paymentStatus,
    });

  } catch (err) {
    console.error("adminUpdatePayment error:", err);
    res.status(500).json({ message: "Payment update failed" });
  }
};


