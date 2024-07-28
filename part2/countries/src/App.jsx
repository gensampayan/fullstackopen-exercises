import { useState, useEffect } from "react";
import { getAllCountry } from "./services/countryService";
import { getWeather } from "./services/weatherService";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capital, setCapital] = useState("");
  const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    getAllCountry()
      .then(initialData => {
        setCountries(initialData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);  

  useEffect(() => {
    if (capital) {
      getWeather(capital)
        .then(initialData => {
          setWeathers([initialData]);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [capital]);

  const handleSearch = (e) => {
    setCountryName(e.target.value);
    setSelectedCountry(null); 
  };

  const matchCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase())
  );

  const handleShow = (countryShow) => {
    setSelectedCountry(countryShow);
    setCountryName("");
  };

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      setCapital(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  const mappedCountriesName = matchCountries.map((countryList, index) => (
    <div key={index}>
      <p>{countryList.name.common}</p>
      <button onClick={() => handleShow(countryList)}>Show</button>
    </div>
  ));

  const mappedWeatherOfCountry = weathers.map((weather, index) => (
    <div key={index}>
      <h2>Weather in {weather.location.name}</h2>
      <p>Temperature {weather.current.temp_c} Celcius</p>
      <img 
        className="weather"
        src={weather.current.condition.icon} 
        alt={weather.current.condition.text} 
      />
      <p>Wind {Math.floor(weather.current.wind_mph * 0.44704).toFixed(2)} m/s</p>
    </div>
  ));

  const mappedDetailOfCountry = selectedCountry && (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <img 
        className="flag"
        src={selectedCountry.flags.svg} 
        alt={selectedCountry.name.common} 
      />
      <div>{mappedWeatherOfCountry}</div>
    </div>
  );

  return (
    <>
      <div>
        <p>Find countries</p>
        <input 
          type="text" 
          value={countryName}
          onChange={handleSearch}
        />
      </div>
      <div>
        {countryName && matchCountries.length > 10 && <p>Too many matches, specify filter.</p>}
        {matchCountries.length > 1 && matchCountries.length <= 10 && !selectedCountry && mappedCountriesName}
        {selectedCountry && mappedDetailOfCountry}
        {countryName && matchCountries.length === 0 && <p>No matches found</p>}
      </div>
    </>
  );
}

export default App;
