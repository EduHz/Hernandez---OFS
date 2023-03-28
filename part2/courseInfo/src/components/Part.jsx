const Part = ({ parts }) =>
  parts.map((res) => (
    <p key={res.id}>
      {res.name} {res.exercises}
    </p>
  ));

export default Part;
