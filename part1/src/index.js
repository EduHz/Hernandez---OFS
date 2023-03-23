import React from "react";
import ReactDOM from "react-dom/client";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const courseInfo = [
    { course: "Half Stack application development", exercises: null, key: 0 },
    { part: "Fundamentals of React", exercises: 10, key: 1 },
    { part: "Using props to pass data", exercises: 7, key: 2 },
    { part: "State of a component", exercises: 14, key: 3 },
  ];

  return (
    <>
      <Header courseInfo={courseInfo} />
      <Content courseInfo={courseInfo} />
      <Total courseInfo={courseInfo} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
