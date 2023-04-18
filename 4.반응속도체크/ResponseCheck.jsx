import React, { useRef, useState } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금!!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state == "ready") {
      // 성급하게 클릭
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
      clearTimeout(timeOut.current);
    } else if (state == "now") {
      //반응속도 채크
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
    }
  };
  const onReset = () => {
    setState("waiting");
    setMessage("클릭해서 시작하세요");
    setResult([]);
    clearTimeout(timeOut.current);
  };
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간: {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onReset}>초기화</button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
