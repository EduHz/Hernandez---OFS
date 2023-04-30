import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import "./App.css";
import Message from "./components/Message";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((ele) => ele.name === newName);

    if (existingPerson) {
      alert(`${existingPerson.name} already exists in the phonebook.`);
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObj).then((response) => {
      setPersons(persons.concat(response.data));
      setMensaje(`Added ${newName}`);
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
    });
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

      <Message mensaje={mensaje} />

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
