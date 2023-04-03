import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import React from "react";
import Webcam from "react-webcam";
import { Card } from "react-bootstrap";

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
    const webRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = React.useCallback(async () => {
        const imageSrc = webRef.current.getScreenshot()
        setUrl(imageSrc)
        
    },[webRef])

    const onUserMedia = (e) => {
        console.log(e)
    }
    const [selectedOption, setSelectedOption] = useState(null);
    const timer = useRef(null);
    const progressBar = useRef(null);

    function gotoNextQuestion() {
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
        timer.current = setTimeout(gotoNextQuestion, 10 * 1000);
        return gotoNextQuestion;
    }, [question]);

    useEffect(()=>{
        setTimeout(()=>{capturePhoto()}, 1000);
        
    });

    return (
        <div>
            <Card style={{ width: '15rem', height: '10rem', justifySelf: 'center', marginLeft: "12rem" ,marginTop:"1rem"}}>
                <Webcam
                    ref={webRef}
                    screenshotFormat="image/png"
                    onUserMedia={onUserMedia}
                />
            </Card>
           
                <div className="question" style={{  marginTop: "2rem" }}>
                    <div className="progress-bar" ref={progressBar}></div>
                    <div className="question-count">
                        <b>{currentQuestion}</b> of <b>{totalQuestions}</b>
                    </div>
                    <div className="main">
                        <div className="title">
                            <span>Question:</span>
                            <p>
                                {question.question}
                            </p>
                        </div>
                        <div className="options">
                            {
                                question.options.map((option, index) => {
                                    return (
                                        <div className={index === selectedOption ? "option active" : "option"}
                                            key={index}
                                            onClick={() => {
                                                setSelectedOption(index)
                                                setUrl(null)
                                            
                                            }}>
                                            {option}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="control">
                        <button onClick={() => {
                            gotoNextQuestion()
                            setUrl(null)
                        }} >Next</button>
                    </div>
                </div>
            

        </div>
    );
}
export default Question;