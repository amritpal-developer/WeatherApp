// components/ForecastDayCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForecastDayCard = ({ day }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{day.datetime}</Text>
      <Text style={styles.temp}>H: {day.tempmax}°  L: {day.tempmin}°</Text>
      <Text style={styles.desc}>{day.conditions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff22',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  date: { color: '#fff', fontSize: 14 },
  temp: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  desc: { color: '#eee', fontSize: 12 },
});

export default ForecastDayCard;
