import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const baseURL = {
  weatherApi: "https://api.openweathermap.org/data/3.0/onecall?",
  geolocationApi: "http://api.openweathermap.org/geo/1.0/direct?",
};

const getCapitalCityCoordinates = async (cityName, countryCode) => {
  try {
    const response = await axios.get(
      `${baseURL.geolocationApi}q=${cityName},${countryCode}&appid=${API_KEY}`
    );

    const locationData = response.data[0];
    const { name, lat, lon } = locationData;

    return { name, lat, lon }; // Returning the extracted data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for the caller to handle if needed
  }
};

const getCapitalCityWeatherData = async (latitude, longitude) => {
  try {
    const request = await axios.get(
      `${baseURL.weatherApi}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );

    const weatherData = request.data;
    const { feels_like, temp, wind_speed, weather } = weatherData.current;

    return { feels_like, temp, wind_speed, weather };
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for the caller to handle if needed
  }
};

export default {
  getCapitalCityCoordinates,
  getCapitalCityWeatherData,
};
