// models/Enquiry.js
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  viewed: { type: Boolean, default: false },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);
