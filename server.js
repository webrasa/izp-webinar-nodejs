require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articles');
const errorHandler = require('./middleware/errorHandler');

// Konektuj DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(req.body)} at ${new Date().toISOString()}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'IZP blog API v1.0' });
});

app.use('/api/articles', articleRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});