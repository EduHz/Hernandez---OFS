import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((ele) => ele.name === newName))
      return alert(newName + " is already added to phonebook");
    if (newNumber === "") return alert("The number can't be empty");
    if (newName === "") return alert("The name can't be empty");
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <h4>name :</h4>
        <input value={newName} onChange={handleName} />
        <h4>number :</h4>
        <input value={newNumber} onChange={handleNumber}></input>
        <h4>

        <button type="submit">add</button>
        </h4>
      </form>
      <h4>Search</h4>
      <input type="text" value={searchName} onChange={handleSearch} />
      <h2>Numbers</h2>
      {filteredPersons.map((res) => (
        <p>
          {res.name} {res.number}
        </p>
      ))}
    </>
  );
}

export default App;
