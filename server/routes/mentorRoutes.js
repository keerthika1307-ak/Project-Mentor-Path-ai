// server/routes/mentorRoutes.js

const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const authMiddleware = require('../middleware/auth'); // your auth middleware

// Protect all mentor routes with authentication middleware
router.use(authMiddleware);

// Get all students assigned to the logged-in mentor
router.get('/students', mentorController.getMentorStudents);

// Get AI alerts for mentor's students
router.get('/ai-alerts', mentorController.getAiAlerts);

// Send feedback to a student
router.post('/feedback/:studentId', mentorController.sendFeedback);

module.exports = router;