// backend/routes/attendance.js
const express = require('express');
const router = express.Router();
const { checkAndSendAttendanceAlerts } = require('../controllers/attendanceController');
const { checkAdminAuth } = require('../middleware/auth');

router.post('/send-attendance-alerts', checkAdminAuth, async (req, res) => {
  try {
    await checkAndSendAttendanceAlerts();
    res.json({ message: 'Attendance alerts sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending attendance alerts' });
  }
});
// backend/routes/attendance.js
const express = require('express');
const router = express.Router();
const { checkAndSendAttendanceAlerts } = require('../controllers/attendanceController');
const { checkAdminAuth } = require('../middleware/auth');

router.post('/send-attendance-alerts', checkAdminAuth, async (req, res) => {
  try {
    await checkAndSendAttendanceAlerts();
    res.json({ message: 'Attendance alerts sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending attendance alerts' });
  }
});

module.exports = router;

module.exports = router;