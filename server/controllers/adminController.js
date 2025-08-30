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
