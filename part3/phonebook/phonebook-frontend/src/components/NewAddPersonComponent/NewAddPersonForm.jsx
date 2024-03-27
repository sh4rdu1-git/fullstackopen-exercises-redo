import { useEffect, useState } from "react";
import phonebookServiceAPI from "../../services/persons";

const NewAddPersonForm = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [notificationDetails, setNotificationDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const responseData = await phonebookServiceAPI.getContacts();
      setPersons(responseData);
    }
    fetchData();
  }, []);

  const newNameInputHandler = (event) => {
    setNewName(event.target.value);
  };

  const newPhoneNumberInputHandler = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const addPersonHandler = (event) => {
    event.preventDefault();

    // check if the input field is empty
    if (newName.length === 0 || newPhoneNumber.length === 0) {
      alert("Input fields cannot be blank!");
      return;
    }

    // Checking if name already present in phonebook
    if (persons.find((person) => person.name === newName)) {
      const confirmUpdate = confirm(
        `${newName} already exists in the phonebook. Do you want to update new phone number?`
      );
      if (!confirmUpdate) {
        return;
      } else {
        // find the contact, and pass it to the respective personUpdate function
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        updatePersonHandler(personToUpdate);
      }
    } else {
      // Person is new and not present in phonebook
      const newPerson = {
        name: newName,
        phoneNumber: newPhoneNumber,
      };

      // Call the API to create new person contact
      phonebookServiceAPI
        .createContact(newPerson)
        .then((newCreatedPerson) => {
          setPersons(persons.concat(newCreatedPerson));
          const notificationObj = {
            notificationType: "success",
            notificationMessage: `Added ${newCreatedPerson.name} to phonebook!`,
          };
          notificationHandler(notificationObj);
          setNewName("");
          setNewPhoneNumber("");
        })
        .catch((error) => {
          console.error(
            `Error while adding person to phonebook: ${error.response.data}`
          );
          const notificationObj = {
            notificationType: "error",
            notificationMessage: `Error creating new contact in phonebook. ErrorMessage: ${error.response.data.error}`,
          };
          notificationHandler(notificationObj);
        });
    }
  };

  const updatePersonHandler = (personToUpdate) => {
    const newUpdatedPerson = {
      ...personToUpdate,
      phoneNumber: newPhoneNumber,
    };

    phonebookServiceAPI
      .modifyContact(newUpdatedPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) => {
            person.id !== personToUpdate.id ? person : updatedPerson;
          })
        );
        setNewName("");
        setNewPhoneNumber("");
        const notificationObj = {
          notificationType: "success",
          notificationMessage: `Updated ${personToUpdate.name} in phonebook!`,
        };
        notificationHandler(notificationObj);
      })
      .catch((error) => {
        console.error(`Error updating person: ${error.response.data.error}`);
        const notificationObj = {
          notificationType: "error",
          notificationMessage: `Failed to update ${personToUpdate.name} in phonebook! ErrorMessage: ${error.response.data.error}`,
        };
        notificationHandler(notificationObj);
      });
  };

  const notificationHandler = (notificationDetails) => {
    setNotificationDetails(notificationDetails);
    setTimeout(() => {
      setNotificationDetails(null);
    }, 5000);
  };

  return (
    <>
      <form>
        <div className="form__newperson">
          <div>
            <label htmlFor="newNameInput">Name</label>
            <input
              id="newNameInput"
              type="text"
              placeholder="Name"
              value={newName}
              onChange={newNameInputHandler}
            />
          </div>
          <div>
            <label htmlFor="newPHoneNumberInput">Phone number</label>
            <input
              id="newPHoneNumberInput"
              type="text"
              placeholder="Phone number"
              value={newPhoneNumber}
              onChange={newPhoneNumberInputHandler}
            />
          </div>
          <button type="submit" onSubmit={addPersonHandler}>
            Add Person
          </button>
        </div>
      </form>
    </>
  );
};

export default NewAddPersonForm;
