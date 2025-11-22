const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
   

  status: { type: String, default: "Not Viewed" }, // optional
  viewed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);
