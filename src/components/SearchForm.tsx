import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="w-12 h-12 text-white mr-2" />
          <h1 className="text-4xl font-bold text-white">Weather Forecast</h1>
        </div>
        <p className="text-white/80 text-lg">Get current weather and 5-day forecast for any city</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/30 text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-lg"
            disabled={isLoading}
          />
          <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Searching...
            </div>
          ) : (
            'Get Weather'
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;