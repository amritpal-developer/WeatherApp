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
} from "react-native";
import WeatherCard from "../../components/WeatherCard";
import { useApi } from "../../service/useWeather";
import HourlyForecastCard from "../../components/HourlyForecastCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InfoCard from "../../components/InfoCard";
import { getInfoCards } from "../../utils/infoCardData";

const WeatherDetailScreen = ({ route }) => {
  const { city } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchWeather, fetchWeatherWithParams } = useApi();

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0af" />
        <Text style={styles.loadingText}>Fetching Weather...</Text>
      </View>
    );
  }

  const today = weatherData?.days[0];
  const globalMin = Math.min(...weatherData.days.map((day) => day.tempmin));
  const globalMax = Math.max(...weatherData.days.map((day) => day.tempmax));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0af"]}
            tintColor="#0af"
          />
        }
      >
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{Math.round(today.temp)}°</Text>
        <Text style={styles.condition}>{today.conditions}</Text>
        <View style={styles.separator} />

        <View style={styles.hourlyWrapper}>
          <Text style={styles.summaryText}>
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
        </View>

        <View style={styles.hourlyWrapper}>
          <View style={styles.forecastHeaderContainer}>
            <Ionicons name={"calendar"} size={20} color={"white"} />
            <Text style={styles.forecastTitle}>10-Day Forecast</Text>
          </View>
          {weatherData?.days.map((day, index) => (
            <WeatherCard
              key={index}
              data={day}
              minTempGlobal={globalMin}
              maxTempGlobal={globalMax}
            />
          ))}
        </View>
        <View style={styles.infoBlock}>
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
        </View>
        <TouchableOpacity onPress={openInMaps} style={styles.mapLinkContainer}>
          <MaterialIcons name="location-on" size={22} color="#0af" />
          <Text style={styles.mapLinkText}>Open {city} in Google Maps</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  forecastHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
  },
  loading: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 50,
    backgroundColor: "#0a0a0a",
  },
  city: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
  },
  temp: {
    fontSize: 64,
    color: "#fff",
    textAlign: "center",
    fontWeight: "300",
    marginBottom: 4,
  },
  condition: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 16,
  },
  infoBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  forecastTitle: {
    color: "#fff",
    fontSize: 20,
    // marginTop: 24,
    // marginBottom: 8,
    marginStart: "2%",
    fontWeight: "600",
  },
  hourlyWrapper: {
    backgroundColor: "#2c2c2e",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  summaryText: {
    color: "#fff",
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
    color: "#0af",
    fontSize: 16,
    marginLeft: 8,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#aaa",
  },
});

export default WeatherDetailScreen;
