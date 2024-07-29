import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const name = "";

const getAllCountry = async () => {
  const request = axios.get(`${baseUrl}/all`);
  const response = await request;
  return response.data;
}

export { getAllCountry };
