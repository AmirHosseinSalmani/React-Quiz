import React from "react";
import Timer from "./Timer";

export default function Question({
  question,
  dispatch,
  answer,
  points,
  index,
  countques,
  seconds,
}) {
  const hasAnswer = answer !== null;
  return (
    <div>
      <progress
        max={countques}
        value={index + Number(answer !== null)}
      ></progress>
      <div className="flex">
        <h4>
          {index + 1} | {countques}
        </h4>
        <h4>{points} | 250</h4>
      </div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? question.correctOption === index
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
      <footer>
        {index < countques - 1 ? (
          <button
            className="btn btn-ui"
            disabled={index === countques - 1 ? hasAnswer : !hasAnswer}
            onClick={() => dispatch({ type: "nextBtn" })}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-ui"
            disabled={index === countques ? hasAnswer : !hasAnswer}
            onClick={() => dispatch({ type: "finishing" })}
          >
            Finished
          </button>
        )}
        <Timer dispatch={dispatch} seconds={seconds}/>
      </footer>
    </div>
  );
}
