import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import './Downloadpage.css';

const API_URL = process.env.REACT_APP_API_URL; // ✅ Use the env variable

const DownloadPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const { token } = useAuth();

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFiles(data.files);
    } catch (err) {
      console.error('Error fetching files:', err);
      alert('❌ Failed to fetch files. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDelete = async (filename) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the file: ${filename}?`);
    if (!confirmDelete) return;

    setDeleting(filename);

    try {
      const res = await fetch(`${API_URL}/files/${filename}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert(`✅ File ${filename} deleted successfully!`);
        fetchFiles(); // refresh list
      } else {
        alert('❌ Failed to delete the file.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('⚠️ Something went wrong while deleting the file.');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (filename) => {
    if (!token) {
      alert('Please login to download the file.');
      return;
    }
    window.open(`${API_URL}/files/${filename}?token=${token}`, '_blank');
  };

  return (
    <div className="download-section">
      <h2>📥 Available Downloads</h2>

      {loading ? (
        <p>Loading files...</p>
      ) : files.length === 0 ? (
        <p>No files available for download.</p>
      ) : (
        <ul className="download-list">
          {files.map((file, index) => (
            <li key={index} className="download-item">
              <button
                onClick={() => handleDownload(file)}
                className="file-link-btn"
              >
                ⬇️ {file}
              </button>

              {deleting === file ? (
                <button disabled className="delete-btn deleting-btn">
                  🕒 Deleting...
                </button>
              ) : (
                <button
                  onClick={() => handleDelete(file)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadPage;
