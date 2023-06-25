import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=YOUR_API_KEY`
      );
      setWeatherData(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=YOUR_API_KEY`
      );
      setWeatherData(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.city_name}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Weather Condition: {weatherData.weather.description}</p>
          <p>Wind Speed: {weatherData.wind_spd} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
