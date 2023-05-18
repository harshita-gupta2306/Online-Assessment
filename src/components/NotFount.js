import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const home = ()=>{
    navigate('/')
  }
  return (
    <div className="not-found-container">
      <div className="error-code">404</div>
      <div className="error-message">Page Not Found</div>
      <div className="animated-bar"></div>
      <div className="error-description">
        Sorry, the page you are looking for does not exist.
      </div>
      <button className="go-home-btn" onClick={home}>Go Home</button>
    </div>
  );
};

export default NotFound;
