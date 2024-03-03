/* eslint react/prop-types: 0 */
import Person from "./Person";

const NumbersListView = ({
  searchQueryText,
  allPersonsList,
  filteredPersonsList,
  handleDeleteContact,
}) => {
  return (
    <div>
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

export default NumbersListView;
