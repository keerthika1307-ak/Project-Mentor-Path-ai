const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const router = express.Router();

// Create student (Mentor-only)
router.post('/', async (req, res) => {
const student = new Student({ 
    ...req.body,
    mentor: req.user.id  // Auto-link to mentor
  });
});

// Get all students for a mentor
router.get('/:mentorId', async (req, res) => {
  try {
    const students = await Student.find({ mentorId: req.params.mentorId });
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
