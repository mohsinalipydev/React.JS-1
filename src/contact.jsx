import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import "./contact.css";
import { useLanguage } from "./LanguageContext";

function Contact({ darkMode, setDarkMode }) {
  const { language } = useLanguage();
  const isUrdu = language === "ur";

  // USESTATE 1: Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // USESTATE 2: Preview visibility
  const [showPreview, setShowPreview] = useState(true);

  // USESTATE 3: Submission counter
  const [count, setCount] = useState(0);

  // USESTATE 4: Draft status
  const [draftSaved, setDraftSaved] = useState(false);

  // USEREF 1: Name input
  const nameInputRef = useRef(null);

  // USEREF 2: Send button
  const sendButtonRef = useRef(null);

  // USEREF 3: Message input
  const messageInputRef = useRef(null);

  // USEREF 4: Confirmation section
  const confirmationRef = useRef(null);

  // USEMEMO: Calculate message statistics
  const messageStats = useMemo(() => {
    const trimmedMessage = message.trim();

    return {
      characters: message.length,
      words: trimmedMessage
        ? trimmedMessage.split(/\s+/).length
        : 0,
      remaining: 500 - message.length,
      status:
        message.length > 400
          ? isUrdu
            ? "حد کے قریب"
            : "Almost full"
          : isUrdu
            ? "حد کے اندر"
            : "Within limit",
    };
  }, [message, isUrdu]);

  // USEEFFECT 1: Automatically focus Name
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // USEEFFECT 2: Update browser tab title
  useEffect(() => {
    if (isUrdu) {
      document.title = name.trim()
        ? `${name.trim()} | رابطہ کریں`
        : "رابطہ کریں | محسن علی";
    } else {
      document.title = name.trim()
        ? `${name.trim()} | Contact Me`
        : "Contact Me | Mohsin Ali";
    }
  }, [name, isUrdu]);

  // USEEFFECT 3: Save draft in browser
  useEffect(() => {
    try {
      localStorage.setItem(
        "contactDraft",
        JSON.stringify({ name, email, message })
      );

      setDraftSaved(true);
    } catch (error) {
      console.error("Could not save draft:", error);
      setDraftSaved(false);
    }
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

  // USECALLBACK 1: Change Send button color
  const changeButtonColor = useCallback(() => {
    if (sendButtonRef.current) {
      sendButtonRef.current.style.backgroundColor = "#16a34a";
      sendButtonRef.current.style.color = "#ffffff";
    }
  }, []);

  // USECALLBACK 2: Reset Send button color
  const resetButtonColor = useCallback(() => {
    if (sendButtonRef.current) {
      sendButtonRef.current.style.backgroundColor = "";
      sendButtonRef.current.style.color = "";
    }
  }, []);

  // USECALLBACK 3: Focus Message textarea
  const focusMessage = useCallback(() => {
    messageInputRef.current?.focus();
  }, []);

  // USECALLBACK 4: Handle form submission
  const handleSubmit = useCallback(
    (e) => {
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
    },
    [name, email, message, resetButtonColor]
  );

  return (
    <div
      className={`contact-page ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
      dir={isUrdu ? "rtl" : "ltr"}
      lang={isUrdu ? "ur" : "en"}
    >
      <div className="contact-container">

        {/* Top bar */}
        <div className="contact-topbar">
          <span className="status-badge">
            <span className="status-dot"></span>
            {isUrdu
              ? "نئے مواقع کے لیے دستیاب"
              : "Available for opportunities"}
          </span>

          {/* Dark / Light Mode */}
          <button
            type="button"
            className="theme-button"
            onClick={() =>
              setDarkMode((previous) => !previous)
            }
          >
            {darkMode
              ? isUrdu
                ? "☀️ لائٹ موڈ"
                : "☀️ Light Mode"
              : isUrdu
                ? "🌙 ڈارک موڈ"
                : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Page heading */}
        <div className="contact-heading">
          <div className="heading-icon">✉</div>

          <p className="eyebrow">
            {isUrdu ? "آئیے رابطہ کریں" : "LET'S CONNECT"}
          </p>

          <h1>
            {isUrdu ? "مجھ سے رابطہ کریں" : "Contact Me"}
          </h1>

          <p className="heading-description">
            {isUrdu
              ? "اگر آپ کے پاس کوئی پروجیکٹ، موقع یا سوال ہے تو مجھے ضرور بتائیں۔"
              : "Have a project, an opportunity, or a question? I'd love to hear from you."}
          </p>
        </div>

        {/* Submission counter */}
        <div className="counter-box">
          <span>
            {isUrdu
              ? "اس سیشن میں بھیجے گئے پیغامات"
              : "Messages submitted this visit"}
          </span>
          <strong>{count}</strong>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="contact-form"
        >
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              {isUrdu ? "پورا نام" : "Full Name"}
            </label>

            <input
              ref={nameInputRef}
              id="name"
              type="text"
              placeholder={
                isUrdu
                  ? "اپنا پورا نام درج کریں"
                  : "Enter your full name"
              }
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setDraftSaved(false);
              }}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              {isUrdu ? "ای میل ایڈریس" : "Email Address"}
            </label>

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

          {/* Message */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="message">
                {isUrdu ? "آپ کا پیغام" : "Your Message"}
              </label>

              <span className="field-hint">
                {isUrdu
                  ? "زیادہ سے زیادہ 500 حروف"
                  : "Max 500 characters"}
              </span>
            </div>

            <textarea
              ref={messageInputRef}
              id="message"
              rows="6"
              maxLength={500}
              placeholder={
                isUrdu
                  ? "اپنے پیغام کے بارے میں کچھ بتائیں..."
                  : "Tell me a little about your message..."
              }
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setDraftSaved(false);
              }}
              required
            />

            <div className="character-count">
              {messageStats.characters}/500{" "}
              {isUrdu ? "حروف" : "characters"}
            </div>
          </div>

          {/* Message Statistics */}
          <div className="message-stats">
            <h3>
              {isUrdu ? "پیغام کی تفصیلات" : "Message Statistics"}
            </h3>

            <div className="stats-grid">
              <div className="stat-item">
                <span>
                  {isUrdu ? "حروف" : "Characters"}
                </span>
                <strong>
                  {messageStats.characters}/500
                </strong>
              </div>

              <div className="stat-item">
                <span>
                  {isUrdu ? "کل الفاظ" : "Total Words"}
                </span>
                <strong>{messageStats.words}</strong>
              </div>

              <div className="stat-item">
                <span>
                  {isUrdu ? "باقی حروف" : "Remaining"}
                </span>
                <strong>{messageStats.remaining}</strong>
              </div>

              <div className="stat-item">
                <span>
                  {isUrdu ? "پیغام کی حالت" : "Message Status"}
                </span>
                <strong>{messageStats.status}</strong>
              </div>
            </div>
          </div>

          {/* Focus Message button */}
          <button
            type="button"
            className="secondary-button"
            onClick={focusMessage}
          >
            {isUrdu
              ? "پیغام والے خانے پر جائیں"
              : "Focus Message Box"}
          </button>

          {/* Show / Hide Preview button */}
          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setShowPreview((previous) => !previous)
            }
          >
            {showPreview
              ? isUrdu
                ? "پیش نظارہ چھپائیں"
                : "Hide Preview"
              : isUrdu
                ? "پیش نظارہ دکھائیں"
                : "Show Preview"}
          </button>

          {/* Live Preview */}
          {showPreview && (
            <div className="preview-box">
              <div className="preview-heading">
                <span className="preview-icon">◉</span>
                <h3>
                  {isUrdu
                    ? "پیغام کا پیش نظارہ"
                    : "Live Message Preview"}
                </h3>
              </div>

              <p>
                <strong>
                  {isUrdu ? "نام:" : "Name:"}
                </strong>{" "}
                {name ||
                  (isUrdu ? "ابھی درج نہیں کیا" : "Not entered yet")}
              </p>

              <p>
                <strong>
                  {isUrdu ? "ای میل:" : "Email:"}
                </strong>{" "}
                {email ||
                  (isUrdu ? "ابھی درج نہیں کیا" : "Not entered yet")}
              </p>

              <p className="preview-message">
                <strong>
                  {isUrdu ? "پیغام:" : "Message:"}
                </strong>{" "}
                {message ||
                  (isUrdu
                    ? "آپ کا پیغام یہاں نظر آئے گا۔"
                    : "Your message will appear here.")}
              </p>
            </div>
          )}

          {/* Draft status */}
          <p className="draft-status" aria-live="polite">
            {draftSaved
              ? isUrdu
                ? "✓ ڈرافٹ اس براؤزر میں محفوظ ہے"
                : "✓ Draft saved in this browser"
              : isUrdu
                ? "ڈرافٹ کی تبدیلیاں محفوظ ہونا باقی ہیں..."
                : "Draft changes pending..."}
          </p>

          {/* Submit button */}
          <button
            ref={sendButtonRef}
            type="submit"
            className="send-button"
            onMouseEnter={changeButtonColor}
            onMouseLeave={resetButtonColor}
          >
            <span>
              {isUrdu ? "پیغام بھیجیں" : "Send Message"}
            </span>
            <span className="send-arrow">
              {isUrdu ? "←" : "→"}
            </span>
          </button>
        </form>

        {/* Confirmation */}
        {count > 0 && (
          <div
            ref={confirmationRef}
            className="confirmation-box"
            aria-live="polite"
          >
            <div className="success-icon">✓</div>

            <h3>
              {isUrdu
                ? "فارم کامیابی سے جمع ہو گیا!"
                : "Form Submitted Successfully!"}
            </h3>

            <p>
              {isUrdu
                ? `آپ کے فارم نے توثیق کے مراحل مکمل کر لیے۔ اس سیشن میں کل پیغامات: ${count}۔`
                : `Your form passed validation. Total submissions this visit: ${count}.`}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Contact;
