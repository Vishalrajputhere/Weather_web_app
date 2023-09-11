import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Forecast from './Forecast';

export default function Main() {
  const [cityInput, setCityInput] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForecastButton, setShowForecastButton] = useState(false);
  const [showForecast, setShowForecast] = useState(false);

  const apiKey = '851cbfa99427fb60541217f318f15ab2';

  function getWeatherData() {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data', data);
        setCurrentWeather(data);
        if (!showForecastButton) {
          setShowForecastButton(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const ct = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const currentTime = ct.toLocaleString(undefined, options);

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <>
      <div id="Sdiv">
        <input
          type="search"
          name=""
          id="search1"
          placeholder="Enter City"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button className="btn btn-primary" id="btn1" onClick={getWeatherData}>
          <FontAwesomeIcon className="Sicon" icon={faSearch} />
        </button>
      </div>

      <div id="resultdiv">
        {isLoading ? (
          <div className='loader'></div>
        ) : currentWeather ? (
          <>
            <p id="cr_time">{currentTime}</p>
            <h2 id="city_name">Weather in: {currentWeather.name}</h2>

            <div className="img_tem">
              <img
                id="tem_img"
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                alt="Weather Icon"
              />
              <p id="tem_deg">{currentWeather.main.temp}°C</p>
            </div>

            <p id="typeweather">{currentWeather.weather[0].main}</p>

            <div className="wind_humi">
              <p id="humi">Humidity</p>
              <p id="wind">Wind Speed</p>
            </div>

            <div className="last">
              <span id="humivalue">{`${Math.round(currentWeather.main.humidity)}%`}</span>
              <span id="windvalue">{`${Math.round(currentWeather.wind.speed * 3.6)} km/hr`}</span>
            </div>
          </>
        ) : (
          <>
            <h5></h5>
          </>
        )}
      </div>

      {showForecastButton && (
        <div id='forecast-btn' className="forecast-button-container">
          <button
            id='forbtn'
            onClick={toggleForecast}
            className={`btn btn-primary ${showForecast ? 'rotate180' : ''}`}
          >
            <div className="button-text">
              {showForecast ? 'Hide Forecast\u00A0\u00A0' : 'Next 5 days Forecast\u00A0\u00A0'}
              <FontAwesomeIcon icon={showForecast ? faArrowDown : faArrowDown} className='downarrow' />
            </div>
          </button>
        </div>
      )}

      {showForecast && <Forecast city={cityInput} />}
    </>
  );
}
