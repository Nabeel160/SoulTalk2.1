import React, { useState, useEffect } from 'react';
import "../../styles/Quiz.css"
import { useNavigate } from 'react-router-dom';
import { questions } from './quizArray';
import { useSelector, useDispatch } from 'react-redux';
import {setData} from "../../reduxStore/slice/RegistrationSlice";
import Result from './Result';
import {login} from "../../reduxStore/slice/Loginslice";
import axios from "axios";
import bg from "../../assets/images/bg1.jpg"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
    'X-CSRFToken': getCSRFToken(), // Ensure you have the getCSRFToken function
  },
});



function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lastAddedScore, setLastAddedScore] = useState(0); // New state variable to store the last added score
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Data = useSelector((state:any) => state.registrations.Registration)




  useEffect(()=> {
    console.log(Data.username)
      console.log(Data.email)
  })



  const handlePlayAgain = async() => {
    setScore(0);
    setLastAddedScore(0); // Reset the last added score
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  }

  const handleNextOption = () => {
    const nextQuestion = currentQuestion + 1;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  }

  const handleSubmit = async() => {
     let response = await client.post('api/register/', {
        username: Data.username,
        first_name: Data.first_name,
        last_name: Data.last_name,
        gender: Data.gender,
        email: Data.email,
        password: Data.password,
        date_of_birth: Data.date_of_birth,
        is_doctor: false,
         score: score,

      });

      if(response.status >= 200 && response.status < 300){
        await client.post('api/login/', {
          email: Data.email,
          password: Data.password
        })
        dispatch(login() as any)
          navigate("/");
      }
  }

  const handlePreviousOption = () => {
    const prevQuestion = currentQuestion - 1;
    if (currentQuestion > 0) {
      // Subtract the last added score from the total score
      setScore(score - lastAddedScore);
      setLastAddedScore(0); // Reset the last added score

      setCurrentQuestion(prevQuestion);
      setSelectedAnswer(null);
    }
  }

  const handleAnswer = (value:any) => {
    setLastAddedScore(value); // Store the last added score
    setScore(score + value);
    setSelectedAnswer(value);
  }

  return (
    <div className='body' style={{backgroundImage:`url(${bg})`}}>
      <div className="apps ">
        {showResults ? (
            <button className='btn btn-success' onClick={handleSubmit}>Complete registeration</button>
        ) : (
          <>
            <div className="questions-sections">
              <div className="questions-counts">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
              <div className='questions-texts'>
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answers-sections">
              {questions[currentQuestion].answerOptions.map((ans, i) => (
                <button
                  className={`button ${selectedAnswer === ans.value ? 'selected' : ''}`}
                  key={i}
                  onClick={() => {
                    handleAnswer(ans.value);
                    handleNextOption();
                  }}
                  style={{ backgroundColor: selectedAnswer === ans.value ? 'green' : '' }}
                  disabled={selectedAnswer !== null}
                >
                  {ans.answerText}
                </button>
              ))}
              <div className="actions">
                <button className="button" onClick={handlePlayAgain}>Quit</button>
                <button className="button" disabled={currentQuestion === 0} onClick={handlePreviousOption}>
                  Previous
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Quiz;