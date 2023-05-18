import React from "react";
import "./SubmissionSuccessPage.css";
import { useNavigate } from "react-router-dom";

const SubmissionSuccessPage = () => {
  let message;
  const navigate = useNavigate();

  message = "You will receive an email with the score link.";

  const returnHome = ()=>{
    navigate('/')
}
  return (
    <div className="submission-success-container">
      <div className="success-message">Successfully Submitted!</div>
      <div className="animated-check">
        <div className="check-icon">&#10004;</div>
      </div>
      <div className="info-message">{message}</div>
      <button className="return-home-btn" onClick={returnHome}>Return Home</button>
    </div>
  );
};

export default SubmissionSuccessPage;
