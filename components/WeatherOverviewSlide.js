import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowRight,
  Wind,
  Gauge,
  Sunset,
  Cloud,
  CloudRain,
  Sun,
} from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const weatherData = [
  { time: 'Now', temp: '-17°', icon: 'rain' },
  { time: '11 AM', temp: '-16°', icon: 'rain' },
  { time: '12 AM', temp: '-15°', icon: 'cloudy' },
  { time: '1 PM', temp: '-14°', icon: 'partlySunny' },
  { time: '2 PM', temp: '-14°', icon: 'sunny' },
];

const WeatherIcon = ({ type, size = 32 }) => {
  const iconProps = { size, color: '#ffffff' };
  
  switch (type) {
    case 'rain':
      return <CloudRain {...iconProps} />;
    case 'cloudy':
      return <Cloud {...iconProps} />;
    case 'partlySunny':
      return <Cloud {...iconProps} />;
    case 'sunny':
      return <Sun {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
};

export function WeatherOverviewSlide() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.8)', 'rgba(147, 197, 253, 0.6)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>WEATHER</Text>
            <Text style={styles.subtitle}>IN YOUR CITY</Text>
          </View>

          {/* Main Weather Info */}
          <View style={styles.mainWeatherContainer}>
            <View style={styles.weatherCard}>
              <View style={styles.weatherRow}>
                <View style={styles.weatherItem}>
                  <View style={styles.weatherItemHeader}>
                    <Text style={styles.weatherLabel}>Temperature</Text>
                    <ArrowRight size={16} color="#ffffff" />
                  </View>
                  <Text style={styles.mainTemp}>-17°</Text>
                  <Text style={styles.tempDetails}>Feels like -2°</Text>
                  <Text style={styles.tempDetails}>Max -14°    Min -19°</Text>
                </View>

                <View style={styles.weatherItem}>
                  <View style={styles.weatherItemHeader}>
                    <Text style={styles.weatherLabel}>Wind</Text>
                    <ArrowRight size={16} color="#ffffff" />
                  </View>
                  <Text style={styles.windSpeed}>3 m/s</Text>
                  <Text style={styles.windDetails}>Northwest</Text>
                  <Text style={styles.windDetails}>Gust up to 5 m/s</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Hourly Forecast */}
          <View style={styles.hourlyContainer}>
            {weatherData.map((item, index) => (
              <View key={index} style={styles.hourlyItem}>
                <WeatherIcon type={item.icon} size={24} />
                <Text style={styles.hourlyTemp}>{item.temp}</Text>
                <Text style={styles.hourlyTime}>{item.time}</Text>
              </View>
            ))}
          </View>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <View style={styles.bottomRow}>
              <View style={styles.bottomItem}>
                <View style={styles.bottomItemHeader}>
                  <Text style={styles.bottomLabel}>Pressure</Text>
                  <ArrowRight size={16} color="#ffffff" />
                </View>
                <View style={styles.pressureContainer}>
                  <View style={styles.pressureGauge}>
                    <Gauge size={48} color="#ffffff" />
                  </View>
                  <View style={styles.pressureText}>
                    <Text style={styles.pressureValue}>760</Text>
                    <Text style={styles.pressureUnit}>mmHg</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bottomItem}>
                <View style={styles.bottomItemHeader}>
                  <Text style={styles.bottomLabel}>Sunset</Text>
                  <ArrowRight size={16} color="#ffffff" />
                </View>
                <View style={styles.sunsetContainer}>
                  <View style={styles.sunsetGraph}>
                    <View style={styles.sunsetLine} />
                    <View style={styles.sunsetDot} />
                  </View>
                  <Text style={styles.sunsetTime}>Sunset at 5:32</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
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
  mainWeatherContainer: {
    marginBottom: 30,
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItem: {
    flex: 1,
  },
  weatherItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
  },
  mainTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  tempDetails: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 2,
  },
  windSpeed: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  windDetails: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 2,
  },
  hourlyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  hourlyItem: {
    alignItems: 'center',
    flex: 1,
  },
  hourlyTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  hourlyTime: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  bottomInfo: {
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
  },
  bottomItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 5,
  },
  bottomItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bottomLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
  },
  pressureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressureGauge: {
    marginRight: 15,
  },
  pressureText: {
    alignItems: 'center',
  },
  pressureValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  pressureUnit: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  sunsetContainer: {
    flex: 1,
  },
  sunsetGraph: {
    height: 30,
    justifyContent: 'center',
    marginBottom: 10,
  },
  sunsetLine: {
    height: 1,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  sunsetDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    position: 'absolute',
    right: 20,
    top: 11,
  },
  sunsetTime: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
});