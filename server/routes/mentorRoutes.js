// routes/mentorRoutes.js
const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.get('/students', mentorController.getStudents);
router.get('/reports/student/:id', mentorController.getStudentReport);

module.exports = router;
