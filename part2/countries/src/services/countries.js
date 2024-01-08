import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  const request = axios.get(`${baseURL}/all`);
  return request.then((response) => {
    return response.data;
  });
};

export default { getAllCountries };
