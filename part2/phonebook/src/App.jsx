import { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import NumbersListView from "./components/NumbersListView";

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

  const handleSearchQueryInputChange = (event) => {
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
  };

  const addPersonToPhonebook = (event) => {
    event.preventDefault(); // prevent the default behaviour of form submit event

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
      <SearchFilter
        searchQuery={searchQuery}
        searchQueryChangeHandler={handleSearchQueryInputChange}
      />
      <h3>Add new person</h3>
      <AddPersonForm
        personName={newName}
        personNameInputHandler={handleNewNameInput}
        personPhoneNumber={newPhoneNumber}
        personPhoneNumberInputHandler={handleNewPhoneNumberInput}
        addPersonToPhonebookHandler={addPersonToPhonebook}
      />
      <h3>Contacts list</h3>
      <NumbersListView
        searchQueryText={searchQuery}
        allPersonsList={persons}
        filteredPersonsList={filteredPersons}
      />
    </>
  );
};

export default App;
