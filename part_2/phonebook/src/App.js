import axios from "axios";
import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    // const copy = [...persons];
    // const result = copy.filter((person) => person.name === newName);
    const result = persons.find((p) => p.name === newName);

    if (result) {
      const r = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one? `
      );
      if (r === true) {
        const changedPerson = { ...result, number: newNumber };
        const id = result.id;
        phonebookService
          .update(id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => (person.id !== id ? person : response))
            );
          })
          .catch("Error");
      }
    } else {
      phonebookService.create(newNameObject).then((returnedPerson) => {
        const copy = [...persons];
        setPersons(copy.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const updateNewName = (event) => {
    setNewName(event.target.value);
  };

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const setFilterText = (event) => {
    setNewFilter(event.target.value);
  };

  // const filterName = () => {};
  const handleDelete = (id, name) => {
    const r = window.confirm(`Delete ${name} ?`);

    if (r === true) {
      phonebookService.deleteContact(id).then((response) => {
        const modifiedPhonebook = persons.filter((person) => person.id !== id);
        setPersons(modifiedPhonebook);
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter name={newFilter} onChange={setFilterText}></Filter>
      <PersonForm
        updateNewName={updateNewName}
        newName={newName}
        updateNewNumber={updateNewNumber}
        newNumber={newNumber}
        handleClick={handleClick}
      ></PersonForm>

      <h2>Numbers</h2>
      <Display
        persons={persons}
        showFilter={newFilter}
        handleDelete={handleDelete}
      ></Display>
    </div>
  );
};

export default App;
