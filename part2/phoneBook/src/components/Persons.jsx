const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((res) => (
        <p key={res.name}>
          {res.name} {res.number}
        </p>
      ))}
    </>
  );
}

export default Persons
