import { useState, useCallback } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    country: string;
  };
}

interface ForecastData {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  forecast: ForecastData[] | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  clearError: () => void;
}

const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '88ae30f63bf999561de07daf89bdbb64'; // Replace with your actual API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${city},in&appid=${API_KEY}&units=metric&lang=en`),
        fetch(`${BASE_URL}/forecast?q=${city},in&appid=${API_KEY}&units=metric&lang=en`)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found. Please check the city name and try again.');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list); // forecast.list is an array of 3-hour intervals
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
    clearError,
  };
};

export default useWeather;
