import { useState, useEffect } from 'react';
import './Report.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Report() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`http://65.0.130.13:8080/api/report?linkId=${id}`)
    .then(response => setUserData(response.data))
    .catch(error => console.log(error));
  },[id]);

  if (!userData) {
    return <div className="personal-report-loading">Loading...</div>;
  }

  const { email, response, score } = userData;

  return (
    <div className="personal-report">
      <h1 className="personal-report__name">{email}'s Score Card</h1>
      <p className="personal-report__score">Total Score: {score}</p>
      <ul className="personal-report__answers">
        {response.data.map(({ question, candidateAnswer, correctAnswer }, index) => (
          <li className="personal-report__answer" key={index}>
            <p className="personal-report__question">{question}</p>
            <p className="personal-report__user-answer">Your Answer: {candidateAnswer}</p>
            <p className="personal-report__correct-answer">Correct Answer: {correctAnswer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Report;
