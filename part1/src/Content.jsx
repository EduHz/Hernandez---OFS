export default function Content(props) {
  const Part = () =>
    props.courseInfo.map((res) => {
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
}
