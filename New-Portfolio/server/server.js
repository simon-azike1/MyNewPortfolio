require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const testimonialRoutes = require('./routes/testimonials');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDatabase();

// Middleware - Add logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// CORS Middleware - Must be BEFORE routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
