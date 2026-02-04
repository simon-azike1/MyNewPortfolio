import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config({ path: path.join(process.cwd(), '.', '.env') });
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from 'cors';
import connectDatabase from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import testimonialRoutes from './routes/testimonials.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDatabase();

// Middleware - Add logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// CORS Middleware - Updated to allow all Vercel deployments
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:5174', // Alternative local port
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow localhost or any vercel.app domain
  if (allowedOrigins.includes(origin) || 
      (origin && origin.endsWith('.vercel.app'))) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
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

// Routes - WITHOUT verifyAdmin here (it's applied per-route instead)
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Catch all handler: send back index.html for client-side routing
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    next();
  }
});

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