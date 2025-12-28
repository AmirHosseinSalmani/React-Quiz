import { useEffect } from "react";
export default function Timer({ dispatch, seconds }) {
  const mins = Math.floor(seconds / 60);
  const secodery = seconds % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 ? "0" + mins : mins} :{" "}
      {secodery < 10 ? "0" + secodery : secodery}
    </div>
  );
}
