import React, { useState } from "react";
import "./Feedback.css";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Feedback = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedEmoji) {
      toast.error("Please select an emoji!");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      navigate("/MapPage");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="thank-you-container">
        <h2>Thank You!</h2>
        <p>We appreciate your feedback.</p>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h2>How was your Trip</h2>
      <div className="emoji-container">
        <span
          className={`emoji ${selectedEmoji === "sad" ? "selected" : ""}`}
          onClick={() => setSelectedEmoji("sad")}
        >
          😔
        </span>
        <span
          className={`emoji ${selectedEmoji === "neutral" ? "selected" : ""}`}
          onClick={() => setSelectedEmoji("neutral")}
        >
          😐
        </span>
        <span
          className={`emoji ${selectedEmoji === "happy" ? "selected" : ""}`}
          onClick={() => setSelectedEmoji("happy")}
        >
          😊
        </span>
        <span
          className={`emoji ${
            selectedEmoji === "very-happy" ? "selected" : ""
          }`}
          onClick={() => setSelectedEmoji("very-happy")}
        >
          😁
        </span>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <Toaster />
    </div>
  );
};

export default Feedback;
