import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import React from "react";
import Webcam from "react-webcam";
import { Card } from "react-bootstrap";
import axios from "axios";

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
  const webRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [screenshotCount, setScreenshotCount] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const onUserMedia = (e) => {
    console.log(e);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  async function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectedOption(null);
  }

  useEffect(() => {
    progressBar.current.classList.remove("active");
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(() => {
      gotoNextQuestion();
      setUrl(null);
    }, 10 * 1000);
    return gotoNextQuestion;
  }, [question]);

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
        id: 1, //dataRef.current.id,
      };
      data = JSON.stringify(data);
      formData.append("data", data);
      formData.append("image", dataURLtoFile(imageSrc, "photo.png"));
      const res = await axios.post(
        `http://35.200.149.190:5000/process_image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      if (res.data.result == true) {
        setScreenshotCount((x) => x + 1);
      }
    } catch (err) {
      console.log(err);
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
    return <div>End Screen</div>;
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
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          onUserMedia={onUserMedia}
        />
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
            {question.options.map((option, index) => {
              return (
                <div
                  className={
                    index === selectedOption ? "option active" : "option"
                  }
                  key={index}
                  onClick={() => {
                    setSelectedOption(index);
                    setUrl(null);
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="control">
          <button
            onClick={() => {
              gotoNextQuestion();
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
