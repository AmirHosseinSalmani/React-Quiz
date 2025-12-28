import React from "react";

export default function Startscreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React quiz!</h2>
      <h3>{numQuestions} qestions to testyour React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}
