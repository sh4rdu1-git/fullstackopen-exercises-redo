/* eslint react/prop-types: 0 */
import Person from "./PersonComponent/Person";

import "./PersonsList.css";

const PersonsList = ({
  searchQueryText,
  allPersonsList,
  filteredPersonsList,
  handleDeleteContact,
}) => {
  return (
    <div className="list__persons">
      {searchQueryText === ""
        ? //  if the filter is blank
          allPersonsList.map((person) => (
            <Person
              key={person.id}
              personName={person.name}
              personPhoneNumber={person.phoneNumber}
              handleDeleteContact={() => handleDeleteContact(person)}
            />
          ))
        : // if the filter is set
          filteredPersonsList.map((person) => (
            <Person
              key={person.id}
              personName={person.name}
              personPhoneNumber={person.phoneNumber}
              handleDeleteContact={() => handleDeleteContact(person)}
            />
          ))}
    </div>
  );
};

export default PersonsList;
