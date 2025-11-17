const User = require("../models/user");
const Internship = require("../models/internship");

exports.getAnalytics = async (req, res) => {
  try {
    // 1. Total students
    const totalStudents = await User.countDocuments({ role: "student" });

    // 2. Applications per internship (domain)
    const applicationsByInternship = await Internship.aggregate([
      {
        $group: {
          _id: "$internshipDomain",
          total: { $sum: 1 }
        }
      }
    ]);

    // 3. Applications per day
    const applicationsPerDay = await Internship.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      }
    ]);

    // 4. College distribution (from internship form)
    const collegeDistribution = await Internship.aggregate([
      {
        $group: {
          _id: "$college",
          total: { $sum: 1 }
        }
      }
    ]);

    return res.json({
      totalStudents,
      applicationsByInternship,
      applicationsPerDay,
      collegeDistribution,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getFeesReport = async (req, res) => {
  try {
    const fees = await Internship.aggregate([
      {
        $group: {
          _id: "$internshipDomain",
          fee: { $first: "$fees" },
          enrolledStudents: { $sum: 1 },
          totalFees: { $sum: "$fees" }
        }
      }
    ]);

    const cleaned = fees.map(f => ({
      domain: f._id,
      fee: f.fee,
      enrolledStudents: f.enrolledStudents,
      totalFees: f.totalFees,
    }));

    res.json(cleaned);
  } catch (error) {
    console.log("Fee report error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
