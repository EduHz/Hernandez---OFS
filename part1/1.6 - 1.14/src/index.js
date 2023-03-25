import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td className="td-style">{text}</td>
    <td className="td-style">{value}</td>
  </tr>
);

const Stactistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const positive = (good * 100) / all + "%";
  const average = (good - bad) / all;

  if ((good === 0) & (neutral === 0) & (bad === 0))
    return <h3>No feedback given</h3>;

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <h1>stactistics</h1>
      <Stactistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
