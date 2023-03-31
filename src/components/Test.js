import React from "react";
import { useState } from "react";
import Question from "./Question.js";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Test = (props) => {
    const location = useLocation();
  const { linkId } = location.state
    console.log(linkId)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/assessmentAttempt/questions?linkId=${linkId}`)
        .then((response) => {
          setQuestions(response.data);
          setMarkedAnswers(new Array(response.data.length));
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const submitAssessment = () => {
        // Logic to submit the assessment
      };

    const setAnswer = (index) => {
      setMarkedAnswers((arr) => {
        let newArr = [...arr];
        newArr[currentQuestionIndex] = index + 1;
        return newArr;
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
  
    return (
      <div className="quiz-screen">
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
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
