// backend/controllers/adminController.js
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const Course = require('../models/Course');

exports.getApiStatus = (req, res) => {
  // Dummy status check - replace with real checks if needed
  res.json({
    openai: true,
    twilio: true,
    nodemailer: true,
  });
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const course = new Course({ name });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

// Add other admin functions like managing mentors, students, etc.
// backend/controllers/adminController.js

exports.getReports = async (req, res) => {
  try {
    // Example: fetch counts from your database
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalMentors = await Mentor.countDocuments();
    const mentorshipCount = await Mentorship.countDocuments();

    // Example: new users in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersLast30Days = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    res.json({
      totalUsers,
      totalStudents,
      totalMentors,
      mentorshipCount,
      newUsersLast30Days,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};