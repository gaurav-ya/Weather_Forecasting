import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, Eye } from 'lucide-react';

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

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (main: string, size: string = 'w-16 h-16') => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'clouds':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'rain':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'snow':
        return <CloudSnow className={`${size} text-blue-200`} />;
      case 'thunderstorm':
        return <CloudLightning className={`${size} text-purple-500`} />;
      default:
        return <Cloud className={`${size} text-gray-500`} />;
    }
  };

  const formatTemperature = (temp: number) => Math.round(temp);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          {weather.name}, {weather.sys.country}
        </h2>
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <div className="text-6xl font-bold text-white mb-2">
          {formatTemperature(weather.main.temp)}°C
        </div>
        <p className="text-xl text-white/90 capitalize">
          {weather.weather[0].description}
        </p>
        <p className="text-lg text-white/80 mt-1">
          Feels like {formatTemperature(weather.main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Humidity</p>
          <p className="text-xl font-semibold text-white">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Wind className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Wind Speed</p>
          <p className="text-xl font-semibold text-white">{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Thermometer className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Pressure</p>
          <p className="text-xl font-semibold text-white">{weather.main.pressure} hPa</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Visibility</p>
          <p className="text-xl font-semibold text-white">{Math.round(weather.visibility / 1000)} km</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;