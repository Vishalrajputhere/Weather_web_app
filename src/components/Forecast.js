import React, { useState, useEffect } from 'react';

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = '851cbfa99427fb60541217f318f15ab2'; 

  useEffect(() => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dailyForecast = data.list.filter((item, index) => index % 8 === 0); 
        setForecast(dailyForecast.slice(0,5)); 
      })
      .catch((error) => {
        console.error('Forecast error:', error);
        setError(error);
      });
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="forecast-container">
      {forecast.map((item) => (
        <div
          key={item.dt}
          className="forecast-card"

        //   onMouseEnter={(e) => {
        //     e.target.style.backgroundColor = '#4caf50'; // Change background color on hover
        //     e.target.style.color = '#fff'; // Change text color on hover
        //   }}
        //   onMouseLeave={(e) => {
        //     e.target.style.backgroundColor = ''; // Reset background color on hover out
        //     e.target.style.color = ''; // Reset text color on hover out
        //   }}
        >

          <div className="card">
          <p className="date">
      {new Date(item.dt * 1000).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </p>
            <img
              src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
            <p className="description">Weather: {item.weather[0].description}</p>
            <p className="min-max-temp">
              Min Temperature: {item.main.temp_min}°C 
            </p>
            <p className="min-max-temp">
             Max Temperature: {item.main.temp_max}°C
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
