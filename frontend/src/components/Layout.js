import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/App.css';  // Update the import for the styles based on the new structure

export default function Layout() {
  return (
    <>
      <header className="navbar">
        <h1>📁 MyDropzone</h1>
        <nav>
          <Link to="/" className="nav-link">Upload</Link>
          <Link to="/downloads" className="nav-link">Download</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
