import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import NumbersListView from "./components/NumbersListView";
import phonebookService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  // useEffect to fetch persons data from json-server
  useEffect(() => {
    phonebookService.getContacts().then((initialData) => {
      setPersons(initialData);
    });
  }, []); // keeping array empty will run this effect only once on page load

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

  // create contact functionality
  const addPersonToPhonebook = (event) => {
    event.preventDefault(); // prevent the default behaviour of form submit event

    // check if the input field is empty
    if (newName.length === 0 || newPhoneNumber.length === 0) {
      alert("Input fields cannot be blank!");
      return;
    }

    // check if the name is already present in the phonebook
    if (persons.find((person) => person.name === newName)) {
      const confirmUpdate = confirm(
        `${newName} already exists in phonebook. Are you sure to update phone number for ${newName}?`
      );
      if (!confirmUpdate) {
        return;
      } else {
        // find the contact, and pass it to the respective updateContact function
        const contactToUpdate = persons.find(
          (person) => person.name === newName
        );
        updateContactInPhonebook(contactToUpdate);
      }
    } else {
      const newPerson = {
        name: newName,
        phoneNumber: newPhoneNumber,
      };

      // call the API service to create new contact
      phonebookService
        .createContact(newPerson)
        .then((newContact) => setPersons(persons.concat(newContact)));

      setNewName("");
      setNewPhoneNumber("");
      console.log(`Successfully added ${newName} to the phonebook!`);
    }
  };

  // modify/update contact functionality
  const updateContactInPhonebook = (contactToUpdate) => {
    const newUpdatedContact = {
      ...contactToUpdate,
      phoneNumber: newPhoneNumber,
    };
    // call the API service to update the contact
    phonebookService
      .modifyContact(newUpdatedContact)
      .then((updatedContact) => {
        setPersons(
          persons.map((contact) =>
            contact.id !== contactToUpdate.id ? contact : updatedContact
          )
        );
        setNewName("");
        setNewPhoneNumber("");
        console.log(
          `Successfully updated contact ${contactToUpdate.name} in the phonebook!`
        );
      })
      .catch((error) => console.log("Error: ", error));
  };

  // delete contact functionality
  const handleDeleteContact = (contactToDelete) => {
    // confirm from user to really delete the contact
    const confirmDelete = confirm(
      `Are you sure you want to delete ${contactToDelete.name}?`
    );

    if (confirmDelete) {
      // call the API service to delete a contact
      phonebookService
        .removeContact(contactToDelete)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== contactToDelete.id)
          );
          setFilteredPersons(
            filteredPersons.filter((person) => person.id !== contactToDelete.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    }
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
        handleDeleteContact={handleDeleteContact}
      />
    </>
  );
};

export default App;
