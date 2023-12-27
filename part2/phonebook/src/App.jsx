import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    if (newName.length === 0) {
      alert("Name cannot be blank.");
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
