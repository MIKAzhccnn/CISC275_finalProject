import "../App.css";
import { Q1 } from "../DetailQuestions/Q1";
import { Q2 } from "../DetailQuestions/Q2";
import { Q3 } from "../DetailQuestions/Q3";
import { Q4 } from "../DetailQuestions/Q4";
import { Q5 } from "../DetailQuestions/Q5";
import { Q6 } from "../DetailQuestions/Q6";
import { Q7 } from "../DetailQuestions/Q7";
import Complete from "../components/Feedback";
import { OpenAIOverlay } from "../components/OpenAIOverlay";
import { AnswerContext } from "../AnswerContext";
import { useState } from "react";
import rightArrow from "../rightArrow.png";
import leftArrow from "../leftArrow.png";
import { Button } from "react-bootstrap";

function Detail_Questions(): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionToEval, setQuestionToEval] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);
  const questions = [<Q1 />, <Q2 />, <Q3 />, <Q4 />, <Q5 />, <Q6 />, <Q7 />];
  const totalQuestions = questions.length;
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(totalQuestions).fill(""),
  );
  const handleNextClick = () => {
    Complete();
    setQuestionToEval(userAnswers[currentQuestion]);
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFireworks(true);
    }
  };

  const handlePrevClick = () => {
    setQuestionToEval(userAnswers[currentQuestion]);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  let keyData = "";
  const saveKeyData = "USER_OAKEY";
  const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
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

          <button
            style={{ backgroundColor: "transparent" }}
            className="right-button"
            id="controls"
            onClick={handleNextClick}
            disabled={currentQuestion === totalQuestions - 1}
          >
            <img sizes="sm" src={rightArrow} alt="Next" />
          </button>
          <br></br>
        </div>

        <br></br>
        <div
          style={{
            width: "100%",
            backgroundColor: "#red",
            borderRadius: "10px",
          }}
        >
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
        </div>
        <br></br>

        <OpenAIOverlay
          basicQuestionSet={false}
          currentQuestion={questionToEval}
          openAIKey={keyData}
        ></OpenAIOverlay>

        <br></br>

        <Button
          onClick={handleNextClick}
          disabled={currentQuestion < totalQuestions - 1}
        >
          Submit
        </Button>
        {showFireworks && <Complete />}
      </div>
    </AnswerContext.Provider>
  );
}

export default Detail_Questions;
