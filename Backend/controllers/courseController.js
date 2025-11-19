const AvailableInternship = require("../models/AvailableInternship");

// GET all courses (public)
exports.getCourses = async (req, res) => {
  try {
    const courses = await AvailableInternship.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// ADMIN: create a course
exports.addCourse = async (req, res) => {
  try {
    const course = await AvailableInternship.create(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
};
