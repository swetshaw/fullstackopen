import axios from "axios";
import React, { useState, useEffect } from "react";

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState("");

  const ACCESS_KEY = "8fe92f97a36f760bfa78e59c5a5ff914";

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${props.capital}`
      )
      .then((response) => {
        setWeatherData(response.data);
      });
  }, [ACCESS_KEY, props.capital]);

  if (!weatherData) {
    return <div></div>;
  }
  return (
    <div>
      {console.log(weatherData)}
      <h1>Weather in {props.capital}</h1>
      <p>
        <b>Temperature: </b> {weatherData.current.temperature} Celcius{" "}
      </p>
      <img
        src={weatherData.current.weather_icons}
        alt="weather-icon"
        style={{ marginLeft: 20 }}
      />
      <p>
        <b>Wind:</b> {weatherData.current.wind_speed} mph direction{" "}
        {weatherData.current.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
