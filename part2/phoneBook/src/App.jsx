import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        console.log(res, 'test axios');
        setPersons(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

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

      <Filter searchName={searchName} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </>
  );
}

export default App;
