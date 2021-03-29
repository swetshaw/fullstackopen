import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const Display = (props) => {
  return (
    <div>
      <tr>
        <td>{props.stats}</td> <td>{props.count}</td>
      </tr>
    </div>
  );
};

const Statistics = (props) => {
  if (!props.good & !props.bad & !props.neutral) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <table style={{ backgroundColor: "yellow" }}>
          <Display stats="good" count={props.good}></Display>
          <Display stats="neutral" count={props.neutral}></Display>
          <Display stats="bad" count={props.bad}></Display>
          <Display
            stats="all"
            count={props.good + props.neutral + props.bad}
          ></Display>
          <Display stats="average" count={props.average()}></Display>
          <Display
            stats="positve percentage"
            count={props.posPercent()}
          ></Display>
        </table>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodBtnFn = () => {
    setGood(good + 1);
  };

  const neutralBtnFn = () => {
    setNeutral(neutral + 1);
  };

  const badBtnFn = () => {
    setBad(bad + 1);
  };

  const average = () => {
    return (good + bad + neutral) / 3;
  };

  const posPercent = () => {
    return (good * 100) / (good + bad + neutral);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={goodBtnFn} text="Good"></Button>
      <Button handleClick={neutralBtnFn} text="Neutral"></Button>
      <Button handleClick={badBtnFn} text="Bad"></Button>
      <h2>Statistics</h2>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        posPercent={posPercent}
      ></Statistics>
    </div>
  );
};

export default App;
