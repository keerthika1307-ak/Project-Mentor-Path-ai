const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using your SMTP details
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Function to send an email
async function sendEmail(to, subject, htmlContent) {
    try {
        const mailOptions = {
            from: `"Smart Mentor" <${process.env.SMTP_USER}>`, // Sender address
            to: to, // Recipient's email address
            subject: subject, // Subject line
            html: htmlContent, // HTML body content
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
}

module.exports = { sendEmail };