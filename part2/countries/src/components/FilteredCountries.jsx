/* eslint react/prop-types: 0 */

const FilteredCountries = ({ filteredCountriesData }) => {
  return filteredCountriesData.map((country) => {
    return (
      <div key={country.ccn3} className="country-list-item">
        <p>{country.name.common}</p>
      </div>
    );
  });
};

export default FilteredCountries;
