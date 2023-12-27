import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Arto Hellas",
      phoneNumber: "1234567891",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumberInput = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const addPersonToPhonebook = (event) => {
    event.preventDefault();

    // check if the input field is empty
    if (newName.length === 0 || newPhoneNumber.length === 0) {
      alert("Input fields cannot be blank");
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
      phoneNumber: newPhoneNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewPhoneNumber("");
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
          phone number:{" "}
          <input value={newPhoneNumber} onChange={handleNewPhoneNumberInput} />
        </div>
        <div>
          <button type="submit" onClick={addPersonToPhonebook}>
            Add person
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.phoneNumber}
        </p>
      ))}
    </>
  );
};

export default App;
