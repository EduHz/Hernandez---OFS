import { useState, useEffect} from "react";
import axios from "axios";

const Card = ({ country }) => {
  const [pais, setPais] = useState(null);
  // const countryNameRef = useRef(country.name.official);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=0a82bdc4c6628b5f968dd500d30a8857&query=${country.name.official}`
      )
      .then((res) => setPais(res.data.current))
      .catch((error) => console.log(error));
  }, [country.name.official]);

  return (
    <div>
      <h1>{country.name.official}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather of {country.name.official}</h2>
      {pais ? (
        <>
          <h4>temperature: {pais.temperature} Celcius</h4>
          <img src={pais.weather_icons} alt="weather" />
          <h4>
            wind: {pais.wind_speed} mph direction {pais.wind_dir}
          </h4>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  console.log(selectedCountry);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const filterCountries = countries.filter((res) =>
    res.name.official.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCardClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <div>find countires</div>
      <input type="text" value={busqueda} onChange={handleBusqueda} />
      {busqueda.length === 0 ? (
        <div> Search a countrie </div>
      ) : filterCountries.length > 10 ? (
        <div> Too many matches, specify another filter </div>
      ) : filterCountries.length === 1 ? (
        <Card country={filterCountries[0]} />
      ) : (
        <>
          {filterCountries.map((country) => (
            <div key={country.name.official}>
              {country.name.official}
              <button onClick={() => handleCardClick(country)}>
                Show Card
              </button>
            </div>
          ))}
          {selectedCountry && <Card country={selectedCountry} />}
        </>
      )}
    </>
  );
};

export default App;
