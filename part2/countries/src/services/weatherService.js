import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = "http://api.weatherapi.com/v1/current.json";


const getWeather = async (name) => {
  const request = axios.get(`${baseUrl}?key=${api_key}&q=${name}`);
  const response = await request;
  return response.data;
}

export { getWeather };
