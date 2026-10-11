
import { useState } from "react";
import "./App.css";
import Navbar from "./navbar";
import Contact from "./contact";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function Home() {
  return (
    <div className="hero">

      {/* Background Video */}
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="video-overlay"></div>

      {/* Home Content */}
      <div className="content">
        <div className="intro">
          <h2>Mohsin</h2>

          <p className="intro-text">
            First, I’d like to introduce myself. My name is{" "}
            <span className="highlight">Mohsin Ali</span>, and I’m from Lahore.
            <br />

            I completed my Bachelor’s degree in{" "}
            <span className="highlight">
              Software Engineering
            </span>{" "}
            in 2025.
            <br />

            I have skills in{" "}
            <span className="highlight">
              Python, Data Science, Machine Learning, AI, and SQL
            </span>
            , and I have worked on several ML and data-related projects.
            <br />

            Currently, I’m looking for an opportunity where I can apply my
            skills and gain{" "}
            <span className="highlight">
              real-world experience.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// =========================
// MAIN APP
// =========================

function App() {

  // Shared theme state for the whole website
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>

      {/* Shared theme wrapper */}
      <div className={darkMode ? "dark-mode" : "light-mode"}>

        {/* Navbar on every page */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Pages */}
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/contact"
            element={
              <Contact
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
