import { useEffect, useState } from "react";
import FilteredCountries from "./components/FilteredCountries.jsx";

import countriesService from "./services/countries.js";
import CountryDetails from "./components/CountryDetails.jsx";

const App = () => {
  const [countries, setCountries] = useState([]); // for storing all countries data
  const [query, setQuery] = useState(""); // for keeping track of the query text
  const [filteredCountries, setFilteredCountries] = useState([]); // for storing list of filtered countries
  const [detailedCountry, setDetailedCountry] = useState({}); // for displaying single country details

  // this effect is run at first render to fetch all countries data
  useEffect(() => {
    countriesService.getAllCountries().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  // this effect will be run whenever there is change in filtered countries list
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setDetailedCountry(filteredCountries[0]);
    } else {
      setDetailedCountry({});
    }
  }, [filteredCountries]);

  const searchCountriesHandler = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    setFilteredCountries(
      countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
    );
  };

  return (
    <div className="container">
      <div className="search">
        <label htmlFor="searchCountries">Search for countries: </label>
        <input
          type="text"
          name="searchCountries"
          onChange={searchCountriesHandler}
          value={query}
        />
      </div>
      <div className="countries-list">
        {filteredCountries.length > 10 ? (
          // if filtered countries are more than 10 then display text
          <p>Too many countries</p>
        ) : detailedCountry.name ? (
          // else if detailedCountry state is set, then display the detailed country
          <CountryDetails countryData={detailedCountry} />
        ) : (
          // else display list of filtered countries
          <FilteredCountries filteredCountriesData={filteredCountries} />
        )}
      </div>
    </div>
  );
};

export default App;
