// server/controllers/adminController.js

const User = require('../models/User');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const Program = require('../models/Program'); // Assuming you have a Program model
const Mentorship = require('../models/Mentorship'); // Assuming mentorship relationships stored here
const OpenAI = require('openai');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

/**
 * Get overall system metrics
 */
exports.getSystemMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMentors = await Mentor.countDocuments();
    const totalStudents = await Student.countDocuments();
    const mentorshipRelationships = await Mentorship.countDocuments();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersLast30Days = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    res.json({
      totalUsers,
      totalMentors,
      totalStudents,
      mentorshipRelationships,
      newUsersLast30Days,
    });
  } catch (error) {
    console.error('Error fetching system metrics:', error);
    res.status(500).json({ message: 'Server error fetching system metrics' });
  }
};

/**
 * Get all students
 */
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().select('_id name email');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error fetching students' });
  }
};

/**
 * Add a new student
 */
exports.addStudent = async (req, res) => {
  try {
    const { name, email, mentorId, cgpa, attendance } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if student with email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Create new student
    const newStudent = new Student({
      name,
      email,
      mentor: mentorId || null,
      cgpa: cgpa || 0,
      attendance: attendance || 0,
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error adding student' });
  }
};

/**
 * Get all programs
 */
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error fetching programs' });
  }
};

/**
 * Add a new program
 */
exports.addProgram = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Program title is required' });
    }

    const newProgram = new Program({ title, description });
    await newProgram.save();

    res.status(201).json({ message: 'Program added successfully', program: newProgram });
  } catch (error) {
    console.error('Error adding program:', error);
    res.status(500).json({ message: 'Server error adding program' });
  }
};

/**
 * Update a program by ID
 */
exports.updateProgram = async (req, res) => {
  try {
    const programId = req.params.id;
    const updates = req.body;

    const updatedProgram = await Program.findByIdAndUpdate(programId, updates, { new: true });

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({ message: 'Program updated successfully', program: updatedProgram });
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ message: 'Server error updating program' });
  }
};

/**
 * Delete a program by ID
 */
exports.deleteProgram = async (req, res) => {
  try {
    const programId = req.params.id;

    const deletedProgram = await Program.findByIdAndDelete(programId);

    if (!deletedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ message: 'Server error deleting program' });
  }
};

/**
 * Generate reports (example: system-wide or custom reports)
 */
exports.generateReport = async (req, res) => {
  try {
    // Example: aggregate some data for reports
    const totalStudents = await Student.countDocuments();
    const totalMentors = await Mentor.countDocuments();
    const avgCgpa = await Student.aggregate([
      { $group: { _id: null, avgCgpa: { $avg: '$cgpa' } } },
    ]);

    res.json({
      totalStudents,
      totalMentors,
      averageCgpa: avgCgpa[0]?.avgCgpa || 0,
      // Add more report data as needed
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Server error generating report' });
  }
};

/**
 * Check API status for external services
 */
exports.getApiStatus = (req, res) => {
  const openai = !!process.env.OPENAI_API_KEY;
  const twilio = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN);
  const nodemailer = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  res.json({ openai, twilio, nodemailer });
};
