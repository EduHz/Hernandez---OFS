export default function Total({ courseInfo }) {
  
  let suma = courseInfo.reduce((n, { exercises }) => n + exercises, 0);

  return (
    <div>
      <p>Number of exercises {suma}</p>
    </div>
  );
}
