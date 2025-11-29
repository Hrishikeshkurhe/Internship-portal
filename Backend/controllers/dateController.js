const Internship = require("../models/internship");

exports.setInternshipDates = async (req, res) => {
  try {
    const { internshipId, startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start and End date are required" });
    }

    // duration calculation (+1 day logic)
    const diffDays =
      Math.floor(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const duration = `${diffDays} days`;

    const updated = await Internship.findByIdAndUpdate(
      internshipId,
      { startDate, endDate, duration },
      { new: true }
    );

    return res.json({
      message: "Internship dates assigned successfully",
      data: updated,
    });

  } catch (err) {
    console.log("Assign Dates Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
