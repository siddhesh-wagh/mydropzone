import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './UploadPage.css';

function UploadPage() {
  const [files, setFiles] = useState([]);
  const { token } = useAuth();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '#f0f5ff';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles(e.dataTransfer.files);
    e.target.style.backgroundColor = '';
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert('✅ Files uploaded successfully!');
        setFiles([]);
      } else {
        const errorText = await res.text();
        alert(`❌ Upload failed: ${errorText}`);
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
            multiple
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
