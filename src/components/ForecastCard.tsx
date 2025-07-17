import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

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

interface ForecastCardProps {
  forecast: ForecastData[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getWeatherIcon = (main: string, size: string = 'w-8 h-8') => {
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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatTemperature = (temp: number) => Math.round(temp);

  // Group forecast by date
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, ForecastData[]>);

  // Get daily forecast (one per day, preferably midday)
  const dailyForecast = Object.values(groupedForecast).map(dayData => {
    const middayData = dayData.find(item => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 12 && hour <= 15;
    });
    return middayData || dayData[0];
  }).slice(0, 5);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {dailyForecast.map((day, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getWeatherIcon(day.weather[0].main)}
                </div>
                <div>
                  <p className="text-white font-semibold">{formatDate(day.dt)}</p>
                  <p className="text-white/80 text-sm capitalize">{day.weather[0].description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-white font-bold text-lg">
                  {formatTemperature(day.main.temp)}°C
                </p>
                <p className="text-white/60 text-sm">
                  {formatTemperature(day.main.temp_min)}° / {formatTemperature(day.main.temp_max)}°
                </p>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between text-sm text-white/70">
              <span>Humidity: {day.main.humidity}%</span>
              <span>Wind: {day.wind.speed} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;