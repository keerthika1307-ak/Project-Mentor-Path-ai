// server/routes/mentor.js

const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const { checkMentorAuth } = require('../middleware/auth');

// Get mentor profile (protected)
router.get('/profile', checkMentorAuth, async (req, res) => {
  try {
    const mentorId = req.user.userId; // Assuming userId is set in auth middleware
    const mentor = await Mentor.findById(mentorId).select('-password'); // Exclude password
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    console.error('Error fetching mentor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update mentor profile (protected)
router.put('/profile', checkMentorAuth, async (req, res) => {
  try {
    const mentorId = req.user.userId;
    const updateData = req.body;

    // Prevent password update here; handle separately if needed
    if (updateData.password) delete updateData.password;

    const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updateData, { new: true }).select('-password');
    if (!updatedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json({ message: 'Profile updated successfully', mentor: updatedMentor });
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get list of students assigned to mentor (protected)
router.get('/students', checkMentorAuth, async (req, res) => {
  try {
    const mentorId = req.user.userId;
    const students = await Student.find({ mentor: mentorId }).select('-password');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
