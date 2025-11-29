const AvailableInternship = require("../models/AvailableInternship");
const Internship = require("../models/internship");

// ✅ Get all internships
exports.getInternships = async (req, res) => {
  try {
    const internships = await AvailableInternship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new internship (admin only)
exports.addInternship = async (req, res) => {
  try {
    const internship = new AvailableInternship(req.body);
    await internship.save();
    res.status(201).json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update internship
exports.updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await AvailableInternship.findByIdAndUpdate(id, req.body, { new: true });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    await AvailableInternship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStudentDetails = async (req, res) => {
  try {
    const students = await Internship.find().sort({ createdAt: -1 });

    // Auto calculate duration
    const formatted = students.map((s) => {
      let duration = "";
      if (s.startDate && s.endDate) {
        const diff =
          (new Date(s.endDate) - new Date(s.startDate)) /
          (1000 * 60 * 60 * 24);
        duration = diff + " days";
      }

      return {
        ...s._doc,
          startDate: s.startDate || null,
        endDate: s.endDate || null,
        duration,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.log("Fetch Student Details Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

