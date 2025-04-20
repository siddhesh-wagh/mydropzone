import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';  // Make sure the path is correct
import DownloadPage from './pages/DownloadPage';  // Make sure the path is correct
import LoginPage from './pages/LoginPage';  // Make sure the path is correct
import PrivateRoute from './components/PrivateRoute';  // Correct path for PrivateRoute
import Layout from './components/Layout';  // Correct path for Layout
import { AuthProvider } from './context/AuthContext';  // Correct path for AuthContext
import './styles/App.css';  // Correct path for App.css if it's moved to the styles folder

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected layout + routes */}
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/" element={<UploadPage />} />
            <Route path="/downloads" element={<DownloadPage />} />
          </Route>

          {/* Fallback: redirect all others to login */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
  