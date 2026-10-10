import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* GitHub logo and brand */}
      <Link to="/" className="navbar-brand">
        <img
          src="https://github.com/fluidicon.png"
          alt="GitHub Logo"
          className="github-logo"
        />
        <span>GitHub</span>
      </Link>

      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/create">Create a Repository</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
