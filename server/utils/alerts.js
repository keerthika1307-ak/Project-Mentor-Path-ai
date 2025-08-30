// backend/utils/alerts.js
const twilio = require('twilio');
const nodemailer = require('nodemailer');

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendSmsAlert(to, message) {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log('SMS sent to', to);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}

async function sendEmailAlert(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent to', to);
  } catch (error) {
    console.error('Error sending Email:', error);
  }
}

module.exports = { sendSmsAlert, sendEmailAlert };
