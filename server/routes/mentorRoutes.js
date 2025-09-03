// server/routes/mentorRoutes.js

const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { checkMentorAuth } = require('../middleware/auth'); // Use specific mentor auth middleware

// Protect all mentor routes with mentor authentication middleware
router.use(checkMentorAuth);

// Get all students assigned to the logged-in mentor
router.get('/students', mentorController.getMentorStudents);

// Get AI alerts for mentor's students
router.get('/ai-alerts', mentorController.getAiAlerts);

// Send feedback to a student
router.post('/feedback/:studentId', mentorController.sendFeedback);

module.exports = router;
