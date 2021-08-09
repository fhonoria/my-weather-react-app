import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

export default function Form() {
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function showTemperature(response) {
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "9840a840dcb1e2ca4cd13597387da153";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a city" onChange={changeCity} />
      <input type="submit" value="search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="Form">
        {form}
        <ul>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {Math.round(wind)} km/h</li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
