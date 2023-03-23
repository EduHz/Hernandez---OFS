export default function Header({ courseInfo }) {
  let title = courseInfo.map((res) => res.course);

  return (
    <>
      <h1>{title}</h1>;
    </>
  );
}
