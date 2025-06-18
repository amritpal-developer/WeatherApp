import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = 'PFRQZY9SKKRDFKDFKEGRZ2LD3'; // replace with your actual key

export const useApi = () => {
  // Fetch with default options (days + current) and use cache
  const fetchWeather = async (city) => {
    const cacheKey = `weather_${city.toLowerCase()}`;

    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.address && parsed?.currentConditions) return parsed;
      }

      const response = await axios.get(`${BASE_URL}/${encodeURIComponent(city)}`, {
        params: {
          unitGroup: 'metric',
          key: API_KEY,
          include: 'days,current',
        },
      });

      const data = response.data;
      if (data?.address && data?.currentConditions) {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
      }

      return null;
    } catch (err) {
      console.error('Weather API fetch error:', err?.response?.data || err.message);
      return null;
    }
  };

  // Flexible fetch with parameters (e.g., include=hours, alerts, etc.)
  const fetchWeatherWithParams = async (city, options = {}, useCache = false) => {
    const query = {
      unitGroup: 'metric',
      key: API_KEY,
      contentType: 'json',
      ...options,
    };

    const queryString = new URLSearchParams(query).toString();
    const url = `${BASE_URL}/${encodeURIComponent(city)}?${queryString}`;
    const cacheKey = `weather_${city.toLowerCase()}_${queryString}`;

    try {
      if (useCache) {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.address) return parsed;
        }
      }

      const response = await axios.get(url);
      const data = response.data;

      if (data?.address) {
        if (useCache) {
          await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
        }
        return data;
      }

      return null;
    } catch (err) {
      console.error('Weather API param fetch error:', err?.response?.data || err.message);
      return null;
    }
  };

  return { fetchWeather, fetchWeatherWithParams };
};
