/* eslint react/prop-types: 0 */

const FilteredCountries = ({ filteredCountriesData, onShowCountryDetails }) => {
  const showCountryDetailsHandler = (country) => {
    onShowCountryDetails(country);
  };

  return filteredCountriesData.map((country) => {
    return (
      <div key={country.ccn3} className="country-list-item">
        <p>{country.name.common}</p>
        <button onClick={() => showCountryDetailsHandler(country)}>
          show details
        </button>
      </div>
    );
  });
};

export default FilteredCountries;
