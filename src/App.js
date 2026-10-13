import { useState } from "react";
import "./App.css";
import Navbar from "./navbar";
import Contact from "./contact";
import {
  LanguageProvider,
  useLanguage
} from "./LanguageContext";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function Home() {
  const { language } = useLanguage();

  return (
    <div className="hero">

      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="video-overlay"></div>

      <div className="content">
        <div className="intro">

          <h2>
            {language === "en" ? "Mohsin" : "محسن"}
          </h2>

          <p className="intro-text">
            {language === "en" ? (
              <>
                First, I’d like to introduce myself.
                My name is{" "}
                <span className="highlight">
                  Mohsin Ali
                </span>
                , and I’m from Lahore.
                <br />

                I completed my Bachelor’s degree in{" "}
                <span className="highlight">
                  Software Engineering
                </span>{" "}
                in 2025.
                <br />

                I have skills in{" "}
                <span className="highlight">
                  Python, Data Science, Machine Learning,
                  AI, and SQL
                </span>
                , and I have worked on several ML and
                data-related projects.
                <br />

                Currently, I’m looking for an opportunity
                where I can apply my skills and gain{" "}
                <span className="highlight">
                  real-world experience.
                </span>
              </>
            ) : (
              <div dir="rtl">
                سب سے پہلے، میں اپنا تعارف کروانا چاہتا ہوں۔
                میرا نام{" "}
                <span className="highlight">
                  محسن علی
                </span>{" "}
                ہے اور میرا تعلق لاہور سے ہے۔
                <br />

                میں نے 2025 میں{" "}
                <span className="highlight">
                  سافٹ ویئر انجینئرنگ
                </span>{" "}
                میں بیچلر کی ڈگری مکمل کی۔
                <br />

                مجھے{" "}
                <span className="highlight">
                  پائتھن، ڈیٹا سائنس، مشین لرننگ، مصنوعی ذہانت
                  اور ایس کیو ایل
                </span>{" "}
                کی مہارت حاصل ہے۔ میں نے مشین لرننگ اور ڈیٹا
                سے متعلق کئی پروجیکٹس پر کام کیا ہے۔
                <br />

                فی الحال، میں ایسے موقع کی تلاش میں ہوں جہاں
                میں اپنی مہارتوں کو استعمال کرتے ہوئے عملی
                تجربہ حاصل کر سکوں۔
              </div>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>
        <Route path="/" element={<Home />} />

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
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
