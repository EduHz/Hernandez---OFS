const Content = ({ parts }) => {
  const Part = () =>
    parts.map((res) => {
      return (
        <p key={res.key}>
          {res.part} {res.exercises}
        </p>
      );
    });

  return (
    <div>
      <Part />
    </div>
  );
};

export default Content;
