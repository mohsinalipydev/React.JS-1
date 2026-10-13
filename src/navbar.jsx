
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { useLanguage } from "./LanguageContext";
import useOnlineStatus from "./hooks/useOnlineStatus";

function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const isOnline = useOnlineStatus();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
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
              <NavLink className="nav-link" to="/" end>
                {language === "en" ? "Home" : "ہوم"}
              </NavLink>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                {language === "en" ? "About" : "میرے بارے میں"}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services">
                {language === "en" ? "Services" : "سروسز"}
              </a>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                {language === "en" ? "Contact" : "رابطہ"}
              </NavLink>
            </li>

          </ul>

          {/* Online / Offline Status */}
          <div className="online-status">
            <span
              className={`status-dot ${
                isOnline ? "status-online" : "status-offline"
              }`}
            ></span>

            <span>
              {isOnline
                ? language === "en" ? "Online" : "آن لائن"
                : language === "en" ? "Offline" : "آف لائن"}
            </span>
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            className="theme-toggle language-toggle"
            onClick={toggleLanguage}
          >
            {language === "en" ? "اردو" : "English"}
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
