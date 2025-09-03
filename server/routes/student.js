// server/routes/student.js

const express = require('express');
const Student = require('../models/Student');
const { checkMentorAuth } = require('../middleware/auth'); // Assuming mentor auth middleware
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

// Create student (Mentor-only)
router.post('/', checkMentorAuth, async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      mentor: req.user.userId, // Auto-link to logged-in mentor
    });

    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students for a mentor
router.get('/:mentorId', checkMentorAuth, async (req, res) => {
  try {
    const students = await Student.find({ mentor: req.params.mentorId });
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feedback routes
router.post('/feedback/:studentId', feedbackController.addMentorFeedback);
router.post('/feedback/ai/:studentId', feedbackController.generateAiFeedback);

module.exports = router;
