import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumberInput = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSearchQueryInput = (event) => {
    setSearchQuery(event.target.value);
    setFilteredPersons(
      persons.filter((person) => {
        return (
          person.name
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
        );
      })
    );
    console.log(filteredPersons);
  };

  const addPersonToPhonebook = (event) => {
    event.preventDefault();

    // check if the input field is empty
    if (newName.length === 0 || newPhoneNumber.length === 0) {
      alert("Input fields cannot be blank!");
      return;
    }

    // check if the name is already present in the phonebook
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists in the phonebook!`);
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
    console.log(`Successfully added ${newName} to the phonebook!`);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        {/* to filter the phonebook by contact name */}
        filter shown with:{" "}
        <input value={searchQuery} onChange={handleSearchQueryInput} />
      </div>
      <form>
        {/* form to add new contact details */}
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
      {searchQuery === ""
        ? //  if the filter is blank
          persons.map((person) => (
            <p key={person.id}>
              {person.name}: {person.phoneNumber}
            </p>
          ))
        : // if the filter is set
          filteredPersons.map((person) => (
            <p key={person.id}>
              {person.name}: {person.phoneNumber}
            </p>
          ))}
    </>
  );
};

export default App;
