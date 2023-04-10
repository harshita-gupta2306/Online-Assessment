import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Assessment.css';
import axios from "axios";

const Assessment = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
    .get('http://65.0.130.13:8080/api/getAssessment')
      .then(response => response.data)
      .then(data => {
        console.log(data);
        setObjects(data)
        setLoading(false);
      }).catch((e)=>{
        console.log(e)
      });
  }, []);
  
  if (loading) {
    return (
      <div className="assessment-container">
        <div className="loading-container">
          <div className="loading-circle"></div>
          <h2 className="loading-text">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <h2 className="assessment-title">Assessment</h2>
      <p className="assessment-description">
        This page contains all the assessments. Select any assessment below:
      </p>
      <div className="assessment-card-container">
        {objects.map((object) => (
          <Link to={`/register/${object.id}`} key={object.id}>
            <div className="assessment-card">
              <h3 className="assessment-card-title">{object.name}</h3>
              <p className="assessment-card-description">{object.assessmentDetails}</p>
              <p className='assessment-card-description'>Exam Starts At: {object.expiryDate ? object.expiryDate.split("T")[0] : "Not available"}</p>
              <p className='assessment-card-description'>Exam Ends At: {object.startDate  ? object.startDate.split("T")[0] : "Not available"}</p>
              <p className='assessment-card-description'>Exam Duration: {object.duration}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Assessment;
