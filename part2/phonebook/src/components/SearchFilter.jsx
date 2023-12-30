/* eslint react/prop-types: 0 */
const SearchFilter = ({ searchQuery, searchQueryChangeHandler }) => {
  return (
    <div>
      {/* to filter the phonebook by contact name */}
      Filter names for:{" "}
      <input value={searchQuery} onChange={searchQueryChangeHandler} />
    </div>
  );
};

export default SearchFilter;
