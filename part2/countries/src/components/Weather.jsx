import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [countryName, setCountryName] = useState(country.name.common);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(
          `http://api.weatherstack.com/current?access_key=cd1ea156ddaa3daf7bef09a7a3a4d0aa&query=${countryName}`
        );
        setWeatherData(response.data.current);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeather();
  }, [countryName]);

  return (
    <>
      <h2>Weather in {countryName}</h2>
      {weatherData ? (
        <>
          <h4>temperature: {weatherData.temperature} Celcius</h4>
          <img src={weatherData.weather_icons} alt="weather" />
          <h4>
            wind: {weatherData.wind_speed} mph direction {weatherData.wind_dir}
          </h4>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
};

export default Weather;
