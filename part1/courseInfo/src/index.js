import React from "react";
import ReactDOM from "react-dom/client";

const Part = ({ parts }) => {
  return parts.map((res) => (
    <p key={res.key}>
      {res.part} {res.exercises}
    </p>
  ));
};

const Content = ({ parts }) => <Part parts={parts} />;

const Total = ({ parts }) => {
  let sum = parts.reduce((n, { exercises }) => n + exercises, 0);
  return <p>Number of exercises {sum}</p>;
};

const Header = ({ name }) => <h1>{name}</h1>;

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10, key: 1 },
      { part: "Using props to pass data", exercises: 7, key: 2 },
      { part: "State of a component", exercises: 14, key: 3 },
    ],
  };

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
