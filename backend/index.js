const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express(); // ✅ MUST be declared before usage

const { router: authRoutes, authenticate } = require('./routes/auth');

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const PORT = 4000;
const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey';

app.use(cors());
app.use(express.json());

// 🔐 Login route
app.use('/auth', authRoutes);

// 🛡️ Optional secret-key middleware (if you still want to use it elsewhere)
const checkKey = (req, res, next) => {
  const key = req.query.key || req.headers['x-api-key'];
  if (key !== SECRET_KEY) return res.status(403).json({ error: 'Invalid key' });
  next();
};

// 📁 File Upload Setup
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// 🔼 Upload Files - Protected by JWT
app.post('/upload', authenticate, upload.array('files'), (req, res) => {
  // Return the list of uploaded files
  if (req.files) {
    const fileNames = req.files.map(file => file.filename);
    return res.json({ message: 'Uploaded successfully', filenames: fileNames });
  } else {
    return res.status(400).json({ error: 'No files uploaded' });
  }
});

// 📂 List Files
app.get('/files', authenticate, (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot list files' });
    res.json({ files });
  });
});

// ⬇️ Download File
app.get('/files/:filename', (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const jwt = require('jsonwebtoken');
  const SECRET = process.env.JWT_SECRET || 'my_jwt_secret';

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const filePath = path.join(uploadsDir, req.params.filename);
    return res.download(filePath);
  });
});

// 🗑️ Delete File
app.delete('/files/:filename', authenticate, (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  console.log('Attempting to delete file:', filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('File not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Could not delete the file' });
      }

      console.log('File deleted:', filePath);
      res.json({ message: 'File deleted successfully' });
    });
  });
});

// 🔊 Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
