import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken); // Store token in localStorage
    setToken(newToken);  // Update the state with the new token
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null);  // Update the state to null
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
