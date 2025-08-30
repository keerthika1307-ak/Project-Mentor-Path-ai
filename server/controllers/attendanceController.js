// backend/controllers/attendanceController.js
const Student = require('../models/Student');
const { sendSmsAlert, sendEmailAlert } = require('../utils/alerts');

const ATTENDANCE_THRESHOLD = 75; // percentage

async function checkAndSendAttendanceAlerts() {
  try {
    const students = await Student.find({});

    for (const student of students) {
      if (student.attendance < ATTENDANCE_THRESHOLD) {
        const message = `Alert: Your attendance is low (${student.attendance}%). Please improve to avoid penalties.`;
        
        // Send SMS
        if (student.contact) {
          await sendSmsAlert(student.contact, message);
        }

        // Send Email
        if (student.email) {
          await sendEmailAlert(student.email, 'Low Attendance Alert', message);
        }
      }
    }
  } catch (error) {
    console.error('Error in attendance alert:', error);
  }
}
const Student = require('../models/Student');
const { sendSmsAlert, sendEmailAlert } = require('../utils/alerts');

const ATTENDANCE_THRESHOLD = 75; // percentage

async function checkAndSendAttendanceAlerts() {
  try {
    const students = await Student.find({});

    for (const student of students) {
      if (student.attendance < ATTENDANCE_THRESHOLD) {
        const message = `Alert: Your attendance is low (${student.attendance}%). Please improve to avoid penalties.`;

        // Send SMS if contact number exists
        if (student.contact) {
          await sendSmsAlert(student.contact, message);
        }

        // Send Email if email exists
        if (student.email) {
          await sendEmailAlert(student.email, 'Low Attendance Alert', message);
        }
      }
    }
  } catch (error) {
    console.error('Error in attendance alert:', error);
  }
}

module.exports = { checkAndSendAttendanceAlerts };

module.exports = { checkAndSendAttendanceAlerts };
