import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import React from "react";
import Webcam from "react-webcam";
import { Card } from "react-bootstrap";
import axios from "axios";
import "./Question.css";
import { monitorImage } from "../api/apiUtil";

function Question({
  question,
  totalQuestions,
  currentQuestion,
  setAnswer,
  assessmentAttemptId,
}) {
  const webRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [screenshotCount, setScreenshotCount] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption("");
  }, [question]);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
    setSelectedAnswer(question.options[index]);
  };

  const timer = useRef(null);
  const progressBar = useRef(null);

  const handleNextClick = () => {
    progressBar.current.classList.remove("active");
    setAnswer(selectedOption !== "" ? selectedOption : "");
    setSelectedOption("");
    gotoNextQuestion();
  };

  async function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  useEffect(() => {
    progressBar.current.classList.remove("active");
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(() => {
      handleNextClick();
      setUrl(null);
    }, 10 * 1000);
  }, [question, timer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((t) => t + 7);
    }, 3000);
    setIntervalId(intervalId);
    return () => clearInterval(intervalId);
  }, [screenshotCount]);

  const webcamRef = React.useRef(null);

  const handleImageCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      const formData = new FormData();
      let data = {
        id: assessmentAttemptId, //dataRef.current.id,
      };
      data = JSON.stringify(data);
      formData.append("data", data);
      formData.append("image", dataURLtoFile(imageSrc, "photo.png"));
      const res = await monitorImage(formData);
      if (res.data.result == false) {
        setScreenshotCount((x) => x + 1);
      }
    } catch (err) {
      console.log(err);
      setScreenshotCount((x) => x + 1);
      //TODO: show error in ui or something
    }
  };

  useEffect(() => {
    if (screenshotCount < 5) {
      handleImageCapture();
    } else {
      clearInterval(intervalId);
      setShowEndScreen(true);
    }
  }, [time]);

  if (showEndScreen) {
    return (
      <div className="chatgpt">
        <div
          className="end-screen"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            backgroundColor: "#ff8a80",
            padding: "4rem",
            borderRadius: "1rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3.0rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Exam Terminated
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              margin: "1rem 0 0",
              lineHeight: "1.2",
            }}
          >
            The examination has been terminated due to the detection of multiple
            individuals or unidentified persons present in the vicinity.
          </p>
          <br></br>
          <p
            style={{
              fontSize: "1.4rem",
              margin: "1rem 0 0",
              lineHeight: "1.2",
            }}
          >
            Sorry, Better luck Next Time!!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Card
        style={{
          width: "15rem",
          height: "10rem",
          justifySelf: "center",
          marginLeft: "12rem",
          marginTop: "1rem",
        }}
      >
        <Webcam ref={webcamRef} screenshotFormat="image/png" />
      </Card>

      <div className="question" style={{ marginTop: "2rem" }}>
        <div className="progress-bar" ref={progressBar}></div>
        <div className="question-count">
          <b>{currentQuestion}</b> of <b>{totalQuestions}</b>
        </div>
        <div className="main">
          <div className="title">
            <span>Question:</span>
            <p>{question.question}</p>
          </div>

          <div className="options">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option ${
                  selectedOption === index ? "selected" : ""
                } ${
                  selectedOption !== null && selectedAnswer !== option
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => handleOptionChange(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="control">
          <button
            onClick={() => {
              handleNextClick();
              setUrl(null);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export default Question;
