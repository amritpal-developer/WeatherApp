import { useState } from 'react';
import { fetchWeather, getCachedWeather } from '../services/WeatherService';
import { WeatherData } from '../models/WeatherData';

export const useWeatherViewModel = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCity = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      const cached = await getCachedWeather();
      if (cached) setWeather(cached);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, searchCity };
};
