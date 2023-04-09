import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Assessment.css';
import axios from "axios";

const Assessment = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:8080/api/getAssessment')
      .then(response => response.data)
      .then(data => {
        console.log(data);
        setObjects(data)
      }).catch((e)=>{
        console.log(e)
      });
  }, []);

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
              <p className='assessment-card-description'>Exam Starts At: {object.startDate ? object.startDate.split("T")[0] : "Not available"}</p>
              <p className='assessment-card-description'>Exam Ends At: {object.expiryDate  ? object.expiryDate.split("T")[0] : "Not available"}</p>
              <p className='assessment-card-description'>Exam Duration: {object.duration}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Assessment;
