import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (e) {
    console.error('Failed to save:', e);
  }
};

export const getData = async (key) => {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Failed to load from storage:', e);
    return null;
  }
};

export const saveCities = async (cities) => {
  try {
    await AsyncStorage.setItem('savedCities', JSON.stringify(cities));
  } catch (e) {
    console.error('Error saving cities', e);
  }
};

export const loadCities = async () => {
  try {
    const json = await AsyncStorage.getItem('savedCities');
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error loading cities', e);
    return [];
  }
};

