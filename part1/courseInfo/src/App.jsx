import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

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

export default App;
