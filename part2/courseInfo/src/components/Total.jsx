const Total = ({ parts }) => (
  <h3>
    total of exercises {parts.reduce((n, { exercises }) => n + exercises, 0)}
  </h3>
);

export default Total;
