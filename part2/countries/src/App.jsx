import { useState, useEffect } from "react";
import axios from "axios";

const Card = (props) => {
  console.log(props.country);

  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <div>capital {props.country.capital}</div>
      <div>population {props.country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(props.country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={props.country.flags.png} alt={props.country.flags.alt} />
    </div>
  );
};

const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log(selectedCountry)

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const filterCountries = countries.filter((res) =>
    res.name.common.toLowerCase().includes(busqueda.toLowerCase())
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
          {filterCountries.map((res) => (
            <div key={res.name.common}>
              {res.name.common}
              <button onClick={() => handleCardClick(res)}>Show Card</button>
            </div>
          ))}
          {selectedCountry && <Card country={selectedCountry} />}
        </>
      )}
    </>
  );
};

export default App;
