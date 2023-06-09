import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to={"/game/number-baseball"}>숫자야구</Link>
        &nbsp;
        <Link to={"/game/rock-scissors-paper"}>가위바위보</Link>
        &nbsp;
        <Link to={"/game/lotto-generator"}>로또생성기</Link>
        &nbsp;
        <Link to={"/game/index"}>게임 매쳐</Link>
      </div>
      <Routes>
        <Route path="/game/:name" element={<GameMatcher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Games;
