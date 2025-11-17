const mongoose = require("mongoose");

const availableInternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  fees: { type: Number, required: true },     // internship fees
  userPaidFees: { type: Number, default: 0 }, // fees user has paid
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AvailableInternship", availableInternshipSchema);
