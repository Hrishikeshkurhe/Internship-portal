const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  internshipDomain: { type: String, required: true },
  resume: { type: String },

  status: { type: String, default: "Pending" },
  userPaidFees: { type: Number, default: 0 },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },

           // NEW
startDate: { type: String, default: "-" },
  endDate: { type: String, default: "-" },
  duration: { type: String, default: "-" },         // NEW (auto-calculated)

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Internship", internshipSchema);
