import "../App.css";
import { Q1 } from "../BasicQuestions/Q1";
import { Q2 } from "../BasicQuestions/Q2";
import { Q3 } from "../BasicQuestions/Q3";
import { Q4 } from "../BasicQuestions/Q4";
import { Q5 } from "../BasicQuestions/Q5";
import { Q6 } from "../BasicQuestions/Q6";
import { Q7 } from "../BasicQuestions/Q7";
import { Q8 } from "../BasicQuestions/Q8";
import Complete from "../components/Feedback";
import { OpenAIOverlay } from "../components/OpenAIOverlay";
import { AnswerContext } from "../AnswerContext";
import { useState, useLayoutEffect } from "react";
import rightArrow from "../rightArrow.png";
import leftArrow from "../leftArrow.png";
import { Button } from "react-bootstrap";
import { Card } from "../components/interfaces";
import { ResultsPage } from "./Results";
import { Loader } from "../components/Loader";

function Basic_Questions(): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionToEval, setQuestionToEval] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);
  const [runReport, setRunReport] = useState(false);
  const [results, setResults] = useState<Card[]>([]);
  const questions = [
    <Q1 />,
    <Q2 />,
    <Q3 />,
    <Q4 />,
    <Q5 />,
    <Q6 />,
    <Q7 />,
    <Q8 />,
  ];
  const totalQuestions = questions.length;
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(totalQuestions).fill(""),
  );

  const handleNextClick = () => {
    const currentAnswer = userAnswers[currentQuestion];
    if (currentAnswer === "" || currentAnswer === "--") {
      alert("Please answer the question before proceeding.");
    } else if (keyData === "") {
      alert("Please enter your OpenAI API.");
    } else {
      setQuestionToEval(userAnswers[currentQuestion]);
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setRunReport(true);
        setShowFireworks(true);
      }
    }
  };

  const handlePrevClick = () => {
    setQuestionToEval(userAnswers[currentQuestion]);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  useLayoutEffect(() => {
    // Your initialization logic here
    setQuestionToEval("init");
  }, []); // Empty dependency array ensures this runs only once

  useLayoutEffect(() => {
    // Your initialization logic here
    if (runReport) {
      setQuestionToEval("RUN REPORT");
    }
  }, [runReport]); // Empty dependency array ensures this runs only once

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  let keyData = "";
  const saveKeyData = "USER_OAKEY";
  const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }

  const handleResults = (data: Card[]) => {
    setResults(data);
  };

  if (results.length > 0) {
    return <ResultsPage cards={results} />;
  }

  return (
    <AnswerContext.Provider value={{ userAnswers, setUserAnswers }}>
      <div style={{ position: "relative", top: "100px" }} className="App">
        <div className="question-container">
          <button
            style={{ backgroundColor: "transparent" }}
            className="left-button"
            id="controls"
            onClick={handlePrevClick}
            disabled={currentQuestion === 0}
          >
            <img sizes="sm" src={leftArrow} alt="Prev" />
          </button>

          <div className="slider">{questions[currentQuestion]}</div>

          {currentQuestion !== totalQuestions - 1 && (
            <button
              style={{ backgroundColor: "transparent" }}
              className="right-button"
              id="controls"
              onClick={handleNextClick}
              disabled={currentQuestion === totalQuestions - 1}
            >
              <img sizes="sm" src={rightArrow} alt="Next" />
            </button>
          )}
        </div>

        <br></br>
        <progress
          value={progress}
          max="100"
          style={{
            width: "100%",
            height: "20px",
            border: "none",
            borderRadius: "10px",
            transition: "width 0.3s ease",
          }}
          className="progress-bar"
        />
        <style>
          {`.progress-bar::-webkit-progress-value {background-color: #FFCC66 !important; border-radius: 10px; }
              .progress-bar::-moz-progress-bar {background-color: #FFCC66 !important; border-radius: 10px; }`}
        </style>
        <br></br>

        <OpenAIOverlay
          basicQuestionSet={true}
          currentQuestion={questionToEval}
          openAIKey={keyData}
          results={handleResults}
        ></OpenAIOverlay>

        <br></br>

        <Button
          onClick={handleNextClick}
          disabled={currentQuestion < totalQuestions - 1}
        >
          Submit
        </Button>

        {runReport && <Loader />}
        {showFireworks && <Complete />}
      </div>
    </AnswerContext.Provider>
  );
}

export default Basic_Questions;
