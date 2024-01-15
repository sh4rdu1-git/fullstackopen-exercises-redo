/* eslint react/prop-types: 0 */

import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const CountryDetails = ({ countryData }) => {
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    weatherService
      .getCapitalCityCoordinates(countryData.capital[0], countryData.cca2)
      .then((capitalCoordinates) => {
        // Call the next asynchronous function for weatherData in the chain
        return weatherService.getCapitalCityWeatherData(
          capitalCoordinates.lat,
          capitalCoordinates.lon
        );
      })
      .then((weatherData) => {
        //   weatherData: {
        //     feels_like: number;
        //     temp: number;
        //     wind_speed: number;
        //     weather: array of object;
        // }
        const data = {
          temp_feels_like: weatherData.feels_like,
          temp: weatherData.temp,
          wind_speed: weatherData.wind_speed,
          weather_condition: weatherData.weather[0].main,
          weather_condition_description: weatherData.weather[0].description,
          weather_condtion_icon_url: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        };
        setCurrentWeather(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [countryData]);

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
      <div>
        <h4>Weather in {countryData.capital}</h4>
        <p>Temperature: {currentWeather.temp} &deg;C</p>
        <p>Wind: {currentWeather.wind_speed} m/s</p>
        <div>
          <p>
            Weather condition: {currentWeather.weather_condition} /{" "}
            {currentWeather.weather_condition_description}
          </p>
          <img
            src={currentWeather.weather_condtion_icon_url}
            alt={currentWeather.weather_condition_description}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
