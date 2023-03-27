const Total = ({ parts }) => {
  let sum = parts.reduce((n, { exercises }) => n + exercises, 0);

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  );
};

export default Total;
