
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar ${
        darkMode ? "navbar-dark-theme" : "navbar-light-theme"
      }`}
    >
      <div className="container">

        {/* Logo / Brand */}
        <Link className="navbar-brand" to="/">
          D'<span>veloper</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                end
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>

          </ul>

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDarkMode((previous) => !previous)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
