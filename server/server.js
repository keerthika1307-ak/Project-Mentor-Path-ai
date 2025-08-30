require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth'); // Ensure this file exists
const authRoutes = require('./routes/auth'); // Ensure this file exists
const studentRoutes = require('./routes/student'); // Ensure this file exists
const reportsRouter = require('./routes/reports');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✔ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('✖ MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB connection fails
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', auth('mentor'), studentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/api/reports', reportsRouter);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

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
