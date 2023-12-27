import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const addPersonToPhonebook = (event) => {
    event.preventDefault();

    // check if the name field is empty
    if (newName.length === 0) {
      alert("Name cannot be blank");
      return;
    }

    // check if the name is already present in the phonebook
    let personsList = persons.map((person) => person.name);
    if (personsList.includes(newName)) {
      alert(`'${newName}' already exists in the phonebook`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    console.log(`Successfully added ${newName}`);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNameInput} />
        </div>
        <div>
          <button type="submit" onClick={addPersonToPhonebook}>
            Add person
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </>
  );
};

export default App;
