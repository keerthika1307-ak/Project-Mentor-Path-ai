const twilio = require('twilio');
const { sendEmail } = require('./emailService'); // Adjust path if needed

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

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

// Wrapper function that calls sendEmail from emailService.js
async function sendEmailAlert(to, subject, htmlContent) {
  return sendEmail(to, subject, htmlContent);
}

module.exports = { sendSmsAlert, sendEmailAlert };