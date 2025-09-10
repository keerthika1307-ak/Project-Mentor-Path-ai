// server/routes/admin.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const auth = require('../middleware/auth');
const { getApiStatus } = require('../controllers/adminController');

// Route: Add new student (Admin only)
router.post('/add-student', auth('admin'), async (req, res) => {
  try {
    const { name, email, rollNumber, course, academicYear, contact, address, department, mentor } = req.body;

    // Basic validation
    if (!name || !email || !rollNumber) {
      return res.status(400).json({ message: 'Name, Email and Roll Number are required' });
    }

    // Check if student with same email or rollNumber already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { rollNumber }]
    });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email or roll number already exists' });
    }

    // Create new student document
    const newStudent = new Student({
      name,
      email,
      rollNumber,
      course: course || '',
      academicYear: academicYear || '',
      contact: contact || '',
      address: address || '',
      department: department || '',
      mentor: mentor || null,
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: Get system reports (Admin only)
router.get('/reports', auth('admin'), async (req, res) => {
  try {
    // Example: aggregate some system metrics
    const totalUsers = await Student.countDocuments() + await Mentor.countDocuments(); // Assuming Mentor model imported
    const totalStudents = await Student.countDocuments();
    const totalMentors = await Mentor.countDocuments();

    // You can extend this with more detailed reports as needed
    res.json({
      totalUsers,
      totalStudents,
      totalMentors,
      // Add more metrics here
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: Get API status (Admin only)
router.get('/api-status', auth('admin'), getApiStatus);

module.exports = router;
