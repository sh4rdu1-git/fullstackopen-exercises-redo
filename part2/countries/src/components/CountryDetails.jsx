/* eslint react/prop-types: 0 */

const CountryDetails = ({ countryData }) => {
  const countryLanguages = Object.entries(countryData.languages).map(
    ([code, name]) => {
      return { code, name };
    }
  );

  return (
    <div>
      <h2>{countryData.name.common}</h2>
      <em>{countryData.name.official}</em>
      <p>Capital: {countryData.capital}</p>
      <p>Area: {countryData.area}</p>
      {/* <p>
        Languages {countryLanguages.map((language) => language.name).join(", ")}
      </p> */}
      <div>
        <p>Languages: </p>
        <ul>
          {countryLanguages.map((language) => (
            <li key={language.code}>{language.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Flag: </p>
        <img
          width={100}
          src={countryData.flags.png}
          alt={countryData.flags.alt}
        />
      </div>
    </div>
  );
};

export default CountryDetails;
