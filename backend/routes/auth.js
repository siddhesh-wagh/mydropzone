// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Add this line to load environment variables

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'my_jwt_secret';

// Get username and password from .env file
const USER = {
  username: process.env.USER_USERNAME,   // Get username from .env file
  password: process.env.USER_PASSWORD,   // Get password from .env file
};

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// Auth middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

module.exports = { router, authenticate };
