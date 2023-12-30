/* eslint react/prop-types: 0 */
const NumbersListView = ({
  searchQueryText,
  allPersonsList,
  filteredPersonsList,
}) => {
  return (
    <div>
      {searchQueryText === ""
        ? //  if the filter is blank
          allPersonsList.map((person) => (
            <p key={person.id}>
              {person.name}: {person.phoneNumber}
            </p>
          ))
        : // if the filter is set
          filteredPersonsList.map((person) => (
            <p key={person.id}>
              {person.name}: {person.phoneNumber}
            </p>
          ))}
    </div>
  );
};

export default NumbersListView;
