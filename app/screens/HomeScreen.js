import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "../../service/useWeather";
import Icon from "react-native-vector-icons/Ionicons";
import { Swipeable } from "react-native-gesture-handler";
import { allCities } from "../../utils/allCities";
import { useTheme } from "../../utils/ThemeContext"; // Theme hook

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [savedCities, setSavedCities] = useState([]);
  const navigation = useNavigation();
  const { fetchWeather } = useApi();
  const { theme } = useTheme(); // Get current theme

  useEffect(() => {
    loadSavedCities();
  }, []);

  const loadSavedCities = async () => {
    const stored = await AsyncStorage.getItem("cities");
    if (stored) {
      const cityArray = JSON.parse(stored);
      const data = await Promise.all(cityArray.map(fetchWeather));
      const validData = data.filter(Boolean);
      setSavedCities(validData);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    const weather = await fetchWeather(search);
    if (!weather) {
      alert("City not found or data unavailable.");
      return;
    }

    const alreadySaved = savedCities.some(
      (c) => c.address.toLowerCase() === weather.address.toLowerCase()
    );

    if (alreadySaved) {
      alert("City is already added.");
      return;
    }

    const updatedCities = [weather, ...savedCities];
    setSavedCities(updatedCities);
    await AsyncStorage.setItem(
      "cities",
      JSON.stringify(updatedCities.map((c) => c.address))
    );
    setSearch("");
    setSuggestions([]);
  };

  const handleSelect = (city) => {
    setSearch(city);
    setSuggestions([]);
  };

  const handleCardPress = (data) => {
    navigation.navigate("DetailScreen", { city: data.address });
  };

  const handleDelete = async (cityName) => {
    const updatedList = savedCities.filter((c) => c.address !== cityName);
    setSavedCities(updatedList);
    await AsyncStorage.setItem(
      "cities",
      JSON.stringify(updatedList.map((c) => c.address))
    );
  };

  useEffect(() => {
    if (search.length > 1) {
      const filtered = allCities
        .map((item) => item.city)
        .filter(
          (cityName, index, self) =>
            cityName.toLowerCase().startsWith(search.toLowerCase()) &&
            self.indexOf(cityName) === index
        );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const formatTime = (datetimeStr) => {
    if (!datetimeStr) return "";
    const [hourStr, minuteStr] = datetimeStr.split(":");
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Weather</Text>

      <View style={[styles.searchBox, { backgroundColor: theme.card }]}>
        <Icon name="search" size={20} color={theme.placeholder} style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search for a city or airport"
          placeholderTextColor={theme.placeholder}
          style={[styles.input, { color: theme.text }]}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="chevron-forward" size={24} color={theme.placeholder} />
          </TouchableOpacity>
        )}
      </View>

      {suggestions.length > 0 && (
        <View style={[styles.suggestionBox, { backgroundColor: theme.card }]}>
          {suggestions.map((s, idx) => (
            <TouchableOpacity key={idx} onPress={() => handleSelect(s)}>
              <Text style={[styles.suggestion, { color: theme.text }]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView style={styles.cityList}>
        {savedCities.map((city, idx) => {
          const renderRightActions = () => (
            <TouchableOpacity
              style={styles.deleteBox}
              onPress={() => handleDelete(city.address)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          );

          return (
            <Swipeable key={idx} renderRightActions={renderRightActions}>
              <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.card }]}
                onPress={() => handleCardPress(city)}
              >
                <View>
                  <Text style={[styles.cityName, { color: theme.text }]}>{city?.address}</Text>
                  <Text style={[styles.condition, { color: theme.subtext }]}>
                    {city?.currentConditions?.conditions}
                  </Text>
                  <Text style={[styles.hl, { color: theme.subtext }]}>
                    H: {Math.round(city?.days?.[0]?.tempmax)}° L:{" "}
                    {Math.round(city?.days?.[0]?.tempmin)}°
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={[styles.temp, { color: theme.text }]}>
                    {Math.round(city?.currentConditions?.temp)}°
                  </Text>
                  <Text style={[styles.time, { color: theme.subtext }]}>
                    {formatTime(city?.currentConditions?.datetime)}
                  </Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    paddingLeft: 8,
  },
  suggestionBox: {
    borderRadius: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  suggestion: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cityList: {
    marginTop: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "600",
  },
  condition: {},
  temp: {
    fontSize: 28,
    fontWeight: "bold",
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  time: {
    fontSize: 14,
    marginTop: 10,
  },
  hl: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default HomeScreen;
