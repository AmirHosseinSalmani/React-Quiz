import { useEffect, useReducer } from "react";
import Header from "./Header";
import Mian from "./Mian";
import Loader from "./Loader";
import Error from "./Error";
import Startscreen from "./Startscreen";
import Question from "./Question";
import FinishScreen from "./FinishScreen";
const initialState = {
  questions: [],
  // loding  , error , ready , active , finished , tick
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: 10,
};

const secondForQuestion = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * secondForQuestion,
      };
    case "newAnswer": {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextBtn":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finishing":
      return {
        ...state,
        status: "Finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // First method
      // return {
      //   ...state,
      //   status: "ready",
      //   index: 0,
      //   answer: null,
      //   points: 0,
      //   highscore: 0,
      // };
      // Second method
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "Finished" : state.status,
      };
    default:
      throw new Error("Action unkonwn");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  function reset() {
    dispatch({ type: "restart" });
  }
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);
  useEffect(
    function () {
      dispatch({ type: "finishing" });
    },
    [dispatch]
  );
  return (
    <div className="app">
      <Header />
      <Mian>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Startscreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
            points={points}
            index={index}
            countques={numQuestions}
            seconds={seconds}
          />
        )}
        {status === "Finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
            reset={reset}
          />
        )}
      </Mian>
    </div>
  );
}
