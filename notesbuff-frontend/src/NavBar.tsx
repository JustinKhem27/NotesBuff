import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">NotesBuff</a>
      </div>
      <div className="navbar-menu">
        <a href="/new" className="navbar-item">New Note</a>
        <a href="/settings" className="navbar-item">Settings</a>
      </div>
    </nav>
  );
};

export default NavBar;
