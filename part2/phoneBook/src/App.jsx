import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((ele) => ele.name === newName);

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, personObj).then((response) => {
          console.log(response)
          setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : response.data)));
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      personService.create(personObj).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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

      <Persons
        filteredPersons={filteredPersons}
        removePerson={(id, name) => removePerson(id, name)}
      />
    </>
  );
}

export default App;
