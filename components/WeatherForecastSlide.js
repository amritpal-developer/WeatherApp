import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
} from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const forecastData = [
  {
    date: '22 December',
    day: 'Today',
    icon: 'partlyCloudy',
    highTemp: '-13°',
    lowTemp: '-17°',
  },
  {
    date: '23 December',
    day: 'Tomorrow',
    icon: 'snow',
    highTemp: '-5°',
    lowTemp: '-6°',
  },
  {
    date: '24 December',
    day: 'Tuesday',
    icon: 'snow',
    highTemp: '-2°',
    lowTemp: '-6°',
  },
  {
    date: '25 December',
    day: 'Wednesday',
    icon: 'cloudy',
    highTemp: '-3°',
    lowTemp: '-5°',
  },
  {
    date: '26 December',
    day: 'Thursday',
    icon: 'partlyCloudy',
    highTemp: '-2°',
    lowTemp: '-4°',
  },
  {
    date: '27 December',
    day: 'Friday',
    icon: 'snow',
    highTemp: '0°',
    lowTemp: '-2°',
  },
];

const WeatherIcon = ({ type, size = 32 }) => {
  const iconProps = { size, color: '#ffffff' };
  
  switch (type) {
    case 'partlyCloudy':
      return (
        <View style={styles.iconContainer}>
          <Sun size={size * 0.7} color="#FCD34D" style={styles.sunIcon} />
          <Cloud size={size} color="#ffffff" style={styles.cloudIcon} />
        </View>
      );
    case 'snow':
      return <CloudSnow {...iconProps} />;
    case 'cloudy':
      return <Cloud {...iconProps} />;
    case 'rain':
      return <CloudRain {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

export function WeatherForecastSlide() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>10 DAY WEATHER</Text>
            <Text style={styles.subtitle}>FORECAST</Text>
          </View>

          {/* Forecast List */}
          <ScrollView
            style={styles.forecastContainer}
            showsVerticalScrollIndicator={false}
          >
            {forecastData.map((item, index) => (
              <View key={index} style={styles.forecastItem}>
                <View style={styles.forecastLeft}>
                  <Text style={styles.forecastDate}>{item.date}</Text>
                  <Text style={styles.forecastDay}>{item.day}</Text>
                </View>
                
                <View style={styles.forecastCenter}>
                  <WeatherIcon type={item.icon} size={40} />
                </View>
                
                <View style={styles.forecastRight}>
                  <Text style={styles.highTemp}>{item.highTemp}</Text>
                  <Text style={styles.lowTemp}>{item.lowTemp}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  forecastContainer: {
    flex: 1,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  forecastLeft: {
    flex: 1.5,
  },
  forecastDate: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.6,
    marginBottom: 4,
  },
  forecastDay: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  forecastCenter: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunIcon: {
    position: 'absolute',
    top: -5,
    left: -5,
  },
  cloudIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },
  forecastRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  highTemp: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lowTemp: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.6,
  },
});