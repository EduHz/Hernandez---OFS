const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id)}>DELETE</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
