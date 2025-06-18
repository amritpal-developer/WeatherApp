import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../utils/ThemeContext';


const iconMap = {
  rain: { name: 'weather-rainy', color: '#4A90E2', family: 'Material' },
  snow: { name: 'weather-snowy', color: '#00BCD4', family: 'Material' },
  clear: { name: 'weather-sunny', color: '#FFD700', family: 'Material' },
  sunny: { name: 'sunny-outline', color: '#FFD700', family: 'Ionicons' },
  cloudy: { name: 'cloud', color: '#B0BEC5', family: 'Feather' },
  fog: { name: 'weather-fog', color: '#90A4AE', family: 'Material' },
  thunder: { name: 'weather-lightning', color: '#FFD54F', family: 'Material' },
};

const renderIcon = (iconConfig) => {
  const { name, color, family } = iconConfig;

  switch (family) {
    case 'Ionicons':
      return <Ionicons name={name} size={30} color={color} />;
    case 'Feather':
      return <Feather name={name} size={30} color={color} />;
    case 'Material':
    default:
      return <MaterialCommunityIcons name={name} size={30} color={color} />;
  }
};

const HourlyForecastCard = ({ hourData }) => {
  const { theme } = useTheme(); 

  if (!hourData) return null;

  const { datetime, temp, icon } = hourData;
  const normalizedIcon = icon?.toLowerCase();
  const iconConfig = iconMap[normalizedIcon] || iconMap.clear;

  const formatHour = (timeStr) => {
    try {
      const [hour, minute] = timeStr.split(':').map(Number);
      const now = new Date();
      const currentHour = now.getHours();

      if (hour === currentHour) return 'Now';

      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minute || 0);

      return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    } catch (error) {
      return timeStr;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.time, { color: theme.text }]}>
        {formatHour(datetime)}
      </Text>
      {renderIcon(iconConfig)}
      <Text style={[styles.temp, { color: theme.text }]}>
        {Math.round(temp)}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginRight: 12,
    width: 65,
  },
  time: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  temp: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
});

export default HourlyForecastCard;
