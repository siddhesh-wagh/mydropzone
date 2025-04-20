import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ← UPDATED: import from context folder
import './UploadPage.css';  // ← No change, assuming styles are in the same folder

function UploadPage() {
  const [files, setFiles] = useState([]);  // ← Changed to store multiple files
  const { token } = useAuth();             // ← NEW: grab the JWT

  // Handle the file selection (via click)
  const handleFileChange = (e) => {
    setFiles(e.target.files);  // ← Store all selected files
  };

  // Handle the drag over event (to allow dropping files)
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '#f0f5ff';
  };

  // Handle the drag leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '';
  };

  // Handle the drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles(e.dataTransfer.files);  // ← Store all dropped files
    e.target.style.backgroundColor = '';
  };

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    // Append each selected file to FormData
    Array.from(files).forEach((file) => {
      formData.append('files', file);  // ← Append multiple files with the same field name
    });

    try {
      const res = await fetch('http://localhost:4000/upload', {   // ← REMOVED ?key=secretKey
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,                      // ← NEW: attach JWT
        },
        body: formData,
      });

      if (res.ok) {
        alert('✅ Files uploaded successfully!');
        setFiles([]);  // Reset the files after upload
      } else {
        alert('❌ Upload failed.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('⚠️ Something went wrong.');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>📤 Upload Files</h2>

        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            id="file-input"
            multiple  // ← Allow multiple file selection
          />
          <label htmlFor="file-input" className="file-label">
            {files.length > 0
              ? `${files.length} file(s) selected`
              : 'Drag & drop files or click to select'}
          </label>
        </div>

        <button onClick={handleUpload} className="upload-btn">
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
