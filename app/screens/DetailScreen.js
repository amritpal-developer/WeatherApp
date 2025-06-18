import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import WeatherCard from "../../components/WeatherCard";
import { useApi } from "../../service/useWeather";
import HourlyForecastCard from "../../components/HourlyForecastCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InfoCard from "../../components/InfoCard";
import { getInfoCards } from "../../utils/infoCardData";
import { useTheme } from "../../utils/ThemeContext"; // Theme hook
import { getBackgroundImage } from "../../utils/getBackgroundImage";
import { BlurView } from "expo-blur";
const WeatherDetailScreen = ({ route }) => {
  const { city } = route.params;

  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchWeatherWithParams } = useApi();
  const { theme } = useTheme(); // Get current theme

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchWeatherWithParams(city, {
        include: "days,hours",
      });
      if (data) {
        setWeatherData(data);
        setHourlyData(data.days[0]?.hours || []);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [city]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      city
    )}`;
    Linking.openURL(url);
  };

  if (loading && !refreshing) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={[styles.loadingText, { color: theme.subtext }]}>
          Fetching Weather...
        </Text>
      </View>
    );
  }

  const today = weatherData?.days[0];
  const globalMin = Math.min(...weatherData.days.map((day) => day.tempmin));
  const globalMax = Math.max(...weatherData.days.map((day) => day.tempmax));
  const currentHour = new Date(today?.datetime).getHours();
  const backgroundImage = getBackgroundImage(today.conditions, currentHour);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView
          style={{ flex: 1 ,marginTop:'25%'}}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.accent]}
              tintColor={theme.accent}
            />
          }
        >
          <Text style={[styles.city, { color: theme.special }]}>{city}</Text>
          <Text style={[styles.temp, { color:  theme.special }]}>
            {Math.round(today.temp)}°
          </Text>
          <Text style={[styles.condition, { color:theme.special  }]}>
            {today.conditions}
          </Text>

          <View style={[styles.separator, { backgroundColor: theme.border }]} />
          <BlurView
            intensity={60}
            style={[styles.hourlyWrapper]}
            tint={theme.mode === "dark" ? "dark" : "light"}
          >
            <Text style={[styles.summaryText, { color: theme.text }]}>
              {today?.description ||
                "Sunny conditions will continue for the rest of the day."}
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hourlyScroll}
            >
              {hourlyData.slice(0, 12).map((hour, index) => (
                <HourlyForecastCard key={index} hourData={hour} />
              ))}
            </ScrollView>
          </BlurView>

          <BlurView
            intensity={60}
            style={[styles.hourlyWrapper]}
            tint={theme.mode === "dark" ? "dark" : "light"}
          >
            <View style={styles.forecastHeaderContainer}>
              <Ionicons name={"calendar"} size={20} color={theme.text} />
              <Text style={[styles.forecastTitle, { color: theme.text }]}>
                10-Day Forecast
              </Text>
            </View>
            {weatherData?.days.map((day, index) => (
              <WeatherCard
                key={index}
                data={day}
                minTempGlobal={globalMin}
                maxTempGlobal={globalMax}
              />
            ))}
      </BlurView>

          <View style={styles.infoBlock}>
            {getInfoCards(today).map((card, index) => (
              <InfoCard
                key={index}
                iconName={card.iconName}
                title={card.title}
                value={card.value}
                unit={card.unit}
                description={card.description}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={openInMaps}
            style={styles.mapLinkContainer}
          >
            <MaterialIcons name="location-on" size={22} color={theme.accent} />
            <Text style={[styles.mapLinkText, { color: theme.accent }]}>
              Open {city} in Google Maps
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  forecastHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
  },
  city: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  temp: {
    fontSize: 64,
    textAlign: "center",
    fontWeight: "300",
    marginBottom: 4,
  },
  condition: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  separator: {
    height: 1,
    marginVertical: 16,
  },
  infoBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  forecastTitle: {
    fontSize: 20,
    marginStart: "2%",
    fontWeight: "600",
  },
  hourlyWrapper: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    overflow: "hidden",
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "400",
  },
  hourlyScroll: {
    flexDirection: "row",
    flex: 1,
  },
  mapLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 12,
  },
  mapLinkText: {
    fontSize: 16,
    marginLeft: 8,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default WeatherDetailScreen;
