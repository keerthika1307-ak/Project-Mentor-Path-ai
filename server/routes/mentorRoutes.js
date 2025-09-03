const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const authMiddleware = require('../middleware/auth'); // your auth middleware

// Protect routes with auth middleware
router.use(authMiddleware);

router.get('/students', mentorController.getStudents);
router.get('/reports/student/:id', mentorController.getStudentReport);

module.exports = router;
