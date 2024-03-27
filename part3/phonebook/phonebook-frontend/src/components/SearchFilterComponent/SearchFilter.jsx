/* eslint react/prop-types: 0 */
const SearchFilter = ({ searchQuery, searchQueryChangeHandler }) => {
  return (
    <div>
      {/* to filter the phonebook by contact name */}
      Filter names by{" "}
      <input
        value={searchQuery}
        onChange={searchQueryChangeHandler}
        placeholder="Enter any name"
      />
    </div>
  );
};

export default SearchFilter;
