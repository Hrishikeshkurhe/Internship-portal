const Enquiry = require("../models/enquiry");

// 📌 Student submits enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.json({ message: "Enquiry submitted successfully", enquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Admin fetch all enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Update status (Viewed / Not Viewed)
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
