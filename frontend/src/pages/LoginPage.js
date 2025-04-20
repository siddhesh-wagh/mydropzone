import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const API_URL = process.env.REACT_APP_API_URL; // ✅ Use environment variable

const LoginPage = () => {
  const [username] = useState('siddhesh'); // Hardcoded username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token);
        navigate('/', { replace: true });
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} readOnly />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default LoginPage;
