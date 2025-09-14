"use client";

import { useEffect, useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState<any>("Dhaka");
  const [searchQuery, setSearchQuery] = useState<any>("Dhaka");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);

  const API_KEY = '51a60db6301747e4827181941242308';

  const fetchWeather = async (loc: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc}`
      );
      if (!res.ok) throw new Error("Failed to fetch weather data");

      const data = await res.json();
      setWeatherData(data);
      setLocation(loc);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWeather(location);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchWeather(searchQuery.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Weather App
      </h1>

      <div className="flex space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Loading weather...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {weatherData && !error && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Weather in {weatherData.location.name},{" "}
            {weatherData.location.country}
          </h2>
          <p className="text-gray-500">{weatherData.location.localtime}</p>

          <div className="flex justify-center items-center space-x-4">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              className="w-16 h-16"
            />
            <h3 className="text-xl font-medium">
              {weatherData.current.temp_c}°C –{" "}
              {weatherData.current.condition.text}
            </h3>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Feels Like:</strong> {weatherData.current.feelslike_c}°C
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.current.humidity}%
            </p>
            <p>
              <strong>Wind:</strong> {weatherData.current.wind_kph} kph (
              {weatherData.current.wind_dir})
            </p>
            <p>
              <strong>UV Index:</strong> {weatherData.current.uv}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
