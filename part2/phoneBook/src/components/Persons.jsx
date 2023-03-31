const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((res) => (
        <p>
          {res.name} {res.number}
        </p>
      ))}
    </>
  );
}

export default Persons
