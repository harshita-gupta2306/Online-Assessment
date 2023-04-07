import React from "react";
import { useState } from "react";
import Question from "./Question.js";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import Webcam from "react-webcam";


const Test = (props) => {
  
    const location = useLocation();
  const { linkId } = location.state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios
        .get(`http://65.0.130.13:8080/api/assessmentAttempt/questions?linkId=${linkId}`)
        .then((response) => {
          setQuestions(response.data);
          setMarkedAnswers(new Array(response.data.length));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const submitAssessment = () => {
      console.log(markedAnswers)
        // Logic to submit the assessment
      };

      const setAnswer = (index) => {
        setMarkedAnswers((arr) => {
          const newArr = [...arr];
          newArr[currentQuestionIndex] = index;
          return newArr;
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      };
  
    return (
      <div className="quiz-screen">
      
        {isLoading ? (
        // <div className="loading">Loading...</div>
        <div
        className="spinner-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" role="status" style={{ color: "#10ccf4" }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
      ) :questions.length > 0 && currentQuestionIndex < questions.length ? (
          <Question
            question={questions[currentQuestionIndex]}
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex + 1}
            setAnswer={setAnswer}
            linkId={linkId}
          />
        ) : (
          <div className="assessment-completed">
          <h2>Assessment Completed</h2>
          <button onClick={submitAssessment}>Submit</button>
        </div>
        )}
      </div>
    );
  };

  export default Test;
