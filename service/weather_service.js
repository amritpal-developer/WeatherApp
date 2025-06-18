// components/useApi.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getData, saveData } from '../utils/offline_storage';

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const API_KEY = 'PFRQZY9SKKRDFKDFKEGRZ2LD3';

export const useWeatherApi = (city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFromApi = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.get(
            `${BASE_URL}/${city}?unitGroup=metric&key=${API_KEY}&include=days,current`
          );
      const day = response?.data?.days[0];
      const result = {
        temp: day?.temp,
        condition: day?.conditions,
        icon: day?.icon,
      };
      setData(result);
      saveData(city, result); // cache offline
    } catch (err) {
      console.warn('API Error:', err.message);
      const cached = await getData(city);
      if (cached) {
        setData(cached);
      } else {
        setError('No internet and no cached data found');
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (city) fetchFromApi();
  }, [city]);

  return { data, loading, error };
};
