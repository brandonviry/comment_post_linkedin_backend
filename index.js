const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const commentRoutes = require('./routes/comment.routes');

const app = express();

// Apply security headers
app.use(helmet());

// Configure CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Load API routes
app.use('/api', commentRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
