const Total = ({ parts }) => {
  let sum = parts.reduce((n, { exercises }) => n + exercises, 0);

  return <p>Number of exercises {sum}</p>;
};

export default Total;
