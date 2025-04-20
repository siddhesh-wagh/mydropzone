import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Updated import for context folder
import './LoginPage.css';  // Assuming styles are in the same folder

const LoginPage = () => {
  const [username] = useState('siddhesh'); // Hardcoded username, no setter needed
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    setError('');  // Clear any previous errors

    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),  // Send both username and password
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token);  // Call the login function from context to store the token
        navigate('/', { replace: true });  // Redirect to home page after successful login
      } else {
        setError(data.error || 'Invalid credentials');  // Show error if login failed
      }
    } catch (err) {
      setError('Network error');  // Handle network errors
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username field is read-only */}
        <input
          type="text"
          value={username}
          readOnly  // Make the username field read-only so the user can't change it
        />
        
        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Set password field value dynamically
          required
        />
        
        <button type="submit">Login</button>
      </form>
      
      {/* Display error message */}
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default LoginPage;
