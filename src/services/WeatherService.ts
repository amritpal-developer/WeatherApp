import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherData } from "../models/WeatherData";
import axios from "axios";
const API_KEY = "PFRQZY9SKKRDFKDFKEGRZ2LD3";
const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const url = `${API_URL}${encodeURIComponent(
    city
  )}?unitGroup=metric&key=${API_KEY}&contentType=json`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    const weather: WeatherData = {
      temperature: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      condition: data.currentConditions.conditions,
      city: data.resolvedAddress,
    };

    await AsyncStorage.setItem("lastWeather", JSON.stringify(weather));
    return weather;
  } catch (error: any) {
    throw new Error("City not found or API error");
  }
};

export const getCachedWeather = async (): Promise<WeatherData | null> => {
  const cached = await AsyncStorage.getItem("lastWeather");
  return cached ? JSON.parse(cached) : null;
};
