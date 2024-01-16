import { useEffect, useState } from "react";
import "../App.css";

import questions1 from "./quizQuestions";

let gameFinished = false;

function Answers({ options, fun1, selected }) {
  const [questionSelected, setQuestionSelect] = useState(false);

  return (
    <div className="questionDiv">
      <p> {options} </p>
      <button
        onClick={() => {
          fun1(options);
          setQuestionSelect(!questionSelected);
        }}
        className={`buttonSelect ${
          selected === options ? "buttonSelected" : ""
        }`}
      ></button>
    </div>
  );
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answerCurrent, setAnswerCurrent] = useState("");

  const [points, setPoints] = useState(0);

  const [finalMassage, setFinalMassage] = useState("");

  function handleClick(answer) {
    setAnswerCurrent(answer);
  }

  function handleNextClick(answer) {
    if (gameFinished) {
      return;
    }

    if (questions1.length - 1 === currentQuestion) {
      gameFinished = true;
      return;
    }

    if (answer === answerCurrent) {
      setPoints(points + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
  }

  useEffect(() => {
    if (gameFinished) {
      setFinalMassage("quiz finished total points: " + points);
    }
  }, [points]);

  return (
    <div>
      <div>
        <h1>Quiz</h1>
        <h1>Points: {points}</h1>
      </div>

      <h3>{questions1[currentQuestion].question}</h3>

      {questions1[currentQuestion].options.map((options) => {
        return (
          <Answers
            options={options}
            fun1={handleClick}
            selected={answerCurrent}
          ></Answers>
        );
      })}

      <div className="buttonDiv">
        <button
          className="buttonNext"
          onClick={() => {
            handleNextClick(questions1[currentQuestion].answer);
          }}
        >
          next
        </button>
      </div>
      <h2>{finalMassage}</h2>
    </div>
  );
}

export default App;
