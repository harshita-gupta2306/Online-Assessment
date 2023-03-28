import React from 'react'
import { useState } from 'react'
import QuestionList from "../data/question.json"
import QuizResult from "./QuizResult.js";
import Question from "./Question.js";


const Test = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex]= useState(0);
    const [markedAnswers, setMarkedAnswers] =  useState(new Array(QuestionList.length));
    const isQuestionEnd= currentQuestionIndex === QuestionList.length;


    function calculateResult(){
        let correct=0;
        QuestionList.forEach((question,index)=>{
            if(question.CorrectOptionIndex === markedAnswers[index]){
                correct=correct+1;
            }
        });
        return{
            total:QuestionList.length,
            correct:correct,
            percentage:Math.trunc((correct/QuestionList.length)*100)
        };
    }
  return (
    <div className='quiz-screen'>
        {
            isQuestionEnd ? (
                <QuizResult 
                    result={calculateResult()}
                />
            ) : (
                <Question
                question ={QuestionList[currentQuestionIndex]}
                totalQuestions = {QuestionList.length}
                currentQuestion = {currentQuestionIndex+1}
                setAnswer={(index)=>{
                    setMarkedAnswers((arr)=>{
                        let newArr = [...arr];
                        newArr[currentQuestionIndex]= index+1;
                        return newArr;

                    });
                    setCurrentQuestionIndex(currentQuestionIndex+1);
                }}
                />
            )
        }
    </div>
  )
}

export default Test