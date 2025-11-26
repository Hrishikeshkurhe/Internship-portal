const User = require("../models/user");
const Internship = require("../models/internship");
const Enquiry = require("../models/enquiry");

exports.getAnalytics = async (req, res) => {
  try {
    // 1. Total students
    const totalStudents = await User.countDocuments({ role: "student" });

    // 2. Total mentors
    const totalMentors = await User.countDocuments({ role: "subadmin" });

    // 3. Total revenue
    const revenueResult = await Internship.aggregate([
      { $group: { _id: null, total: { $sum: "$userPaidFees" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

   // 4. Total enquiries ⭐
    const totalEnquiries = await Enquiry.countDocuments();

    // 5. Applications group by domain
    const applicationsByInternship = await Internship.aggregate([
      { $group: { _id: "$internshipDomain", total: { $sum: 1 } } }
    ]);

    // 6. Applications per day
    const applicationsPerDay = await Internship.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: 1 }
        }
      }
    ]);

    // 7. College Distribution
    const collegeDistribution = await Internship.aggregate([
      { $group: { _id: "$college", total: { $sum: 1 } } }
    ]);

    return res.json({
      totalStudents,
      totalMentors,
      totalRevenue,
      totalEnquiries,    

      applicationsByInternship,
      applicationsPerDay,
      collegeDistribution,
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
