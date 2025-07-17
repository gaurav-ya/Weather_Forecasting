import React, { useEffect } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';
import useWeather from './hooks/useWeather';

function App() {
  const { weather, forecast, loading, error, fetchWeather, clearError } = useWeather();

  useEffect(() => {
    // Load weather for a default city on app start
    fetchWeather('Delhi');
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SearchForm onSearch={fetchWeather} isLoading={loading} />
          
          {error && (
            <div className="lg:col-span-2">
              <ErrorMessage message={error} onDismiss={clearError} />
            </div>
          )}
          
          {weather && !loading && (
            <WeatherCard weather={weather} />
          )}
        </div>
        
        {forecast && !loading && (
          <div className="grid grid-cols-1 max-w-4xl mx-auto">
            <ForecastCard forecast={forecast} />
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"></div>
                <p className="text-white text-xl font-semibold">Loading weather data...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;