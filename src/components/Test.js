import React from "react";
import { useState } from "react";
import Question from "./Question.js";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Webcam from "react-webcam";
import { getQuestions, submitAnswers } from "../api/apiUtil.js";
import DisableRightClickPage from "./disableRightClick.js";

const Test = (props) => {
  const location = useLocation();
  const { linkId, assessmentAttemptId } = location.state;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuestions(linkId)
      .then((response) => {
        setQuestions(response.data);
        setMarkedAnswers(new Array(response.data.length));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [linkId]);

  const submitAssessment = async () => {
    const updatedData = markedAnswers.map((obj) => {
      if (typeof obj.answer === "undefined") {
        obj.answer = "";
      }
      return obj;
    });
    const resp = await submitAnswers(updatedData, linkId);
  };

  const setAnswer = (index) => {
    setMarkedAnswers((arr) => {
      const newArr = [...arr];
      const qid = questions[currentQuestionIndex].id;
      const existingAnswerIndex = newArr.findIndex(
        (item) => item && item.qid === qid
      );

      if (existingAnswerIndex === -1) {
        newArr[currentQuestionIndex] = {
          qid,
          answer: questions[currentQuestionIndex].options[index],
        };
      } else {
        newArr[existingAnswerIndex] = {
          qid,
          answer: questions[currentQuestionIndex].options[index],
        };
      }

      return newArr;
    });
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  };

  return (
    <div className="quiz-screen">
      <DisableRightClickPage />
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
          <Spinner
            animation="border"
            role="status"
            style={{ color: "#10ccf4" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex]}
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex + 1}
          setAnswer={setAnswer}
          assessmentAttemptId={assessmentAttemptId}
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
