import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useWeatherViewModel } from '../viewmodels/WeatherViewModel';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const { weather, loading, error, searchCity } = useWeatherViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={() => searchCity(city)} />

      {loading && <ActivityIndicator style={styles.loader} />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weather && !loading && (
        <View style={styles.card}>
          <Text style={styles.city}>{weather.city}</Text>
          <Text>Temperature: {weather.temperature}°C</Text>
          <Text>Humidity: {weather.humidity}%</Text>
          <Text>Wind Speed: {weather.windSpeed} km/h</Text>
          <Text>Condition: {weather.condition}</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  loader: { marginTop: 20 },
  error: { color: 'red', textAlign: 'center', marginVertical: 10 },
  card: { marginTop: 20, padding: 15, backgroundColor: '#eee', borderRadius: 8 },
  city: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 }
});
