
import { useState, useEffect, useRef } from "react";
import "./contact.css";

function Contact() {
  // USESTATE 1: Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // USESTATE 2: Theme
  const [darkMode, setDarkMode] = useState(true);

  // USESTATE 3: Preview
  const [showPreview, setShowPreview] = useState(true);

  // USESTATE 4: Submission counter
  const [count, setCount] = useState(0);

  const [draftSaved, setDraftSaved] = useState(false);

  // USEREF 1: Name input
  const nameInputRef = useRef(null);

  // USEREF 2: Send button
  const sendButtonRef = useRef(null);

  // USEREF 3: Message input
  const messageInputRef = useRef(null);

  // USEREF 4: Confirmation section
  const confirmationRef = useRef(null);

  // USEEFFECT 1: Automatically focus Name
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // USEEFFECT 2: Update browser tab title
  useEffect(() => {
    document.title = name.trim()
      ? `${name} | Contact Me`
      : "Contact Me | Mohsin Ali";
  }, [name]);

  // USEEFFECT 3: Save draft in browser
  useEffect(() => {
    localStorage.setItem(
      "contactDraft",
      JSON.stringify({ name, email, message })
    );
    setDraftSaved(true);
  }, [name, email, message]);

  // USEEFFECT 4: Scroll to confirmation
  useEffect(() => {
    if (count > 0) {
      confirmationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [count]);

  const changeButtonColor = () => {
    if (sendButtonRef.current) {
      sendButtonRef.current.style.backgroundColor = "#16a34a";
      sendButtonRef.current.style.color = "#ffffff";
    }
  };

  const resetButtonColor = () => {
    if (sendButtonRef.current) {
      sendButtonRef.current.style.backgroundColor = "";
      sendButtonRef.current.style.color = "";
    }
  };

  const focusMessage = () => {
    messageInputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    setCount((previousCount) => previousCount + 1);

    setName("");
    setEmail("");
    setMessage("");
    setDraftSaved(false);

    resetButtonColor();
  };

  return (
    <div
      className={`contact-page ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="contact-container">

        <div className="contact-topbar">
          <span className="status-badge">
            <span className="status-dot"></span>
            Available for opportunities
          </span>

          <button
            type="button"
            className="theme-button"
            onClick={() =>
              setDarkMode((previous) => !previous)
            }
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="contact-heading">
          <div className="heading-icon">✉</div>
          <p className="eyebrow">LET'S CONNECT</p>
          <h1>Contact Me</h1>
          <p className="heading-description">
            Have a project, an opportunity, or a question?
            I'd love to hear from you.
          </p>
        </div>

        <div className="counter-box">
          <span>Messages submitted this visit</span>
          <strong>{count}</strong>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              ref={nameInputRef}
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setDraftSaved(false);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDraftSaved(false);
              }}
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="message">Your Message</label>
              <span className="field-hint">Max 500 characters</span>
            </div>

            <textarea
              ref={messageInputRef}
              id="message"
              rows="6"
              maxLength={500}
              placeholder="Tell me a little about your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setDraftSaved(false);
              }}
              required
            />

            <div className="character-count">
              {message.length}/500 characters
            </div>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={focusMessage}
          >
            Focus Message Box
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setShowPreview((previous) => !previous)
            }
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          {showPreview && (
            <div className="preview-box">
              <div className="preview-heading">
                <span className="preview-icon">◉</span>
                <h3>Live Message Preview</h3>
              </div>

              <p>
                <strong>Name:</strong>{" "}
                {name || "Not entered yet"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {email || "Not entered yet"}
              </p>

              <p className="preview-message">
                <strong>Message:</strong>{" "}
                {message || "Your message will appear here."}
              </p>
            </div>
          )}

          <p className="draft-status" aria-live="polite">
            {draftSaved
              ? "✓ Draft saved in this browser"
              : "Draft changes pending..."}
          </p>

          <button
            ref={sendButtonRef}
            type="submit"
            className="send-button"
            onMouseEnter={changeButtonColor}
            onMouseLeave={resetButtonColor}
          >
            <span>Send Message</span>
            <span className="send-arrow">→</span>
          </button>

         
        </form>

        {count > 0 && (
          <div
            ref={confirmationRef}
            className="confirmation-box"
            aria-live="polite"
          >
            <div className="success-icon">✓</div>
            <h3>Form Submitted Successfully!</h3>
            <p>
              Your form passed validation. Total submissions
              this visit: {count}.
            </p>
       
          </div>
        )}

        
      </div>
    </div>
  );
}

export default Contact;
