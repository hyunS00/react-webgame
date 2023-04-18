import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeOut;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, messagemresult } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeOut = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금!!!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state == "ready") {
      // 성급하게 클릭
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
      });
      clearTimeout(this.timeOut);
    } else if (state == "now") {
      //반응속도 채크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };
  onReset = () => {
    this.setState({
      state: "waiting",
      message: "클릭해서 시작하세요",
      result: [],
    });
    clearTimeout(this.timeOut);
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간: {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={this.onReset}>초기화</button>
      </>
    );
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
