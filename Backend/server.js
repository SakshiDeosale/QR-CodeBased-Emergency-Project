const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Add fs module for file system operations
const connectDB = require('./src/config/dbConfig');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express App
const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created at:', uploadDir);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve static files from uploads folder
app.use('/uploads', express.static(uploadDir));

// Serve static files from the 'frontend/build' directory (after React app is built)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// For any other route that doesn’t match an API route, serve the React app (index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});