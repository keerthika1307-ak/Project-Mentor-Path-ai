// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const auth = require('./middleware/auth'); // auth middleware factory
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const reportsRouter = require('./routes/reports');
const attendanceController = require('./controllers/attendanceController');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority',
})
.then(() => console.log('✔ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('✖ MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB connection fails
});

// Routes
app.use('/api/auth', authRoutes);

// Protect student routes with auth middleware for mentor role
app.use('/api/students', auth('mentor'), studentRoutes);

app.use('/api/reports', reportsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ status: 'OK', db: dbState });
});

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Schedule daily attendance alert check at 9 AM server time
cron.schedule('0 9 * * *', () => {
  console.log('Running daily attendance alert check at 9 AM');
  attendanceController.checkAndSendAttendanceAlerts()
    .catch(err => console.error('Error in attendance alert check:', err));
});
