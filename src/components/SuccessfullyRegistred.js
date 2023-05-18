import React from 'react';
import './SuccessfullyRegistred.css';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    const returnHome = ()=>{
        navigate('/')
    }
  return (
    <div className="success-container">
      <div className="success-message">Successfully Registered!</div>
      <div className="animated-check">
        <div className="check-icon">&#10004;</div>
      </div>
      <div className="info-message">
        You will receive an email with a test link.
      </div>
      <button className="return-home-btn" onClick={returnHome}>Return Home</button>
    </div>
  );
};

export default SuccessPage;
